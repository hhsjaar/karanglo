
import prisma from "@/lib/prisma"
import { HeroSlider } from "./hero-slider"

export async function Hero() {
    const banners = await prisma.banner.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
    })

    // Fallback if no banners seeded? Ideally we seeded them.
    // If db fails, it will throw, which Next.js will handle with error boundary.

    return <HeroSlider banners={banners} />
}
