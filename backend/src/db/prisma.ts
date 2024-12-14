import { PrismaClient } from "@prisma/client";

// Declare a global variable for the Prisma client
declare global {
  var prisma: PrismaClient | undefined;
}

// Create and export the Prisma client instance
export const db = globalThis.prisma || new PrismaClient();

// In non-production environments, assign the Prisma client to the global variable
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;