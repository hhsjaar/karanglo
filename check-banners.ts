import prisma from './src/lib/prisma';

async function main() {
    console.log("Checking banners...");
    const banners = await prisma.banner.findMany();
    console.log("DB_BANNERS:", JSON.stringify(banners.map(b => b.image), null, 2));
    
    const brokenUrls = [
        "https://images.unsplash.com/photo-1588668214407-6ea9e6d8c278?q=80&w=2574&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1473183577329-87c2db1b7c25?q=80&w=3540&auto=format&fit=crop"
    ];

    const needsFix = banners.some(b => brokenUrls.includes(b.image));
    if (needsFix) {
        console.log("Fixing broken banners...");
        await prisma.banner.updateMany({
            where: { image: brokenUrls[0] },
            data: { image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2670&auto=format&fit=crop" }
        });
        await prisma.banner.updateMany({
            where: { image: brokenUrls[1] },
            data: { image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2670&auto=format&fit=crop" }
        });
        console.log("✅ Banners updated in DB.");
    } else {
        console.log("No broken banners found in DB.");
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
