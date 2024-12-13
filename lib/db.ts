import { PrismaClient } from '@prisma/client';

// Declare prisma as a global variable
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a new PrismaClient instance if it's not already created
const prisma = globalThis.prisma || new PrismaClient();

// Store the prisma instance globally for development to prevent multiple connections
if (process.env.NODE_ENV === 'production') {
  globalThis.prisma = prisma;
}

export { prisma };
