import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prismaClient = () =>
  new PrismaClient({
    log: ["warn", "error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // Configuration pour Neon (base auto-suspend)
    transactionOptions: {
      maxWait: 5000, // 5 secondes max d'attente
      timeout: 10000, // 10 secondes timeout
    },
  });

export const prisma =
  globalForPrisma.prisma ??
  (process.env.DATABASE_URL
    ? prismaClient()
    : ({
        category: { findMany: async () => [] },
        brand: { findMany: async () => [] },
        product: {
          findMany: async () => [],
          findUnique: async () => null,
          count: async () => 0,
        },
      } as unknown as PrismaClient));

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


