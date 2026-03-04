import prisma from "./src/lib/prisma";
async function main() {
  const admin = await prisma.admin.findFirst();
  console.log("Found admin:", admin?.username);
}
main().catch(console.error).finally(() => prisma.$disconnect());
