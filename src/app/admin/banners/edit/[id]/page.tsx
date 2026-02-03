import { BannerForm } from "@/components/admin/banner-form";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditBannerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const banner = await prisma.banner.findUnique({
        where: { id },
    });

    if (!banner) {
        notFound();
    }

    return <BannerForm banner={banner} isEdit />;
}
