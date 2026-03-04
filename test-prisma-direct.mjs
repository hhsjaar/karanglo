import { PrismaClient } from "@prisma/client";
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
const env = dotenv.parse(readFileSync('.env'));

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL
    }
  }
});
prisma.banner.findFirst().then(console.log).catch(console.error).finally(()=>prisma.$disconnect());
