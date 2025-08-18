import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prismaClient = () =>
  new PrismaClient({
    log: ["warn", "error"],
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


