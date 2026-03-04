import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL?.replace(/\?pgbouncer=true(&connection_limit=\d+)?/, "");

if (!connectionString) {
    console.warn("DATABASE_URL/DIRECT_URL is not defined in environment variables!");
}

const pool = new Pool({
    connectionString,
    ssl: connectionString?.includes("supabase.com") ? { rejectUnauthorized: false } : false
});
const adapter = new PrismaPg(pool);

declare global {
    var prismaGlobal: undefined | PrismaClient
}

const prisma = globalThis.prismaGlobal ?? new PrismaClient({ adapter });

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
