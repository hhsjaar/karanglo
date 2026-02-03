import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

declare global {
    var prismaGlobal: undefined | PrismaClient
}

const prisma = globalThis.prismaGlobal ?? new PrismaClient({ adapter });

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
