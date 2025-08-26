import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prismaClient = () =>
  new PrismaClient({
    log: ["warn", "error"],
    datasources: {
      db: {
        url: process.env.DIRECT_URL, // Utilise DIRECT_URL pour le test
      },
    },
    // Configuration pour test avec DIRECT_URL
    transactionOptions: {
      maxWait: 15000, // 15 secondes max d'attente
      timeout: 30000, // 30 secondes timeout
    },
  });

export const prisma =
  globalForPrisma.prisma ??
  (process.env.DIRECT_URL
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
