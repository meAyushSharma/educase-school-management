import { PrismaClient } from "@prisma/client";

/* to ensure multiple connections are not instantiated */
declare global {
    var prisma: PrismaClient | undefined;
}
const prisma = global.prisma || new PrismaClient();
global.prisma = prisma;

export const School = prisma.school;
export default prisma;
