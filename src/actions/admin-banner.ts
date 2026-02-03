"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- BANNER ACTIONS ---

export async function getBanners() {
    return await prisma.banner.findMany({
        orderBy: { order: "asc" },
    });
}

export async function createBanner(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;
    const link = formData.get("link") as string;
    const isActive = formData.get("isActive") === "on";

    if (!title || !image) {
        return { message: "Judul dan Gambar wajib diisi." };
    }

    try {
        await prisma.banner.create({
            data: {
                title,
                description,
                image,
                link,
                isActive,
                order: 99, // Default to end, can be reordered later
            },
        });
    } catch (error) {
        console.error("Create Banner Error:", error);
        return { message: "Gagal membuat banner." };
    }

    revalidatePath("/admin/banners");
    revalidatePath("/"); // Update homepage
    return { message: "Success" };
}

export async function updateBanner(id: string, prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;
    const link = formData.get("link") as string;
    const isActive = formData.get("isActive") === "on";

    try {
        await prisma.banner.update({
            where: { id },
            data: {
                title,
                description,
                image,
                link,
                isActive,
            },
        });
    } catch (error) {
        console.error("Update Banner Error:", error);
        return { message: "Gagal mengupdate banner." };
    }

    revalidatePath("/admin/banners");
    revalidatePath("/");
    return { message: "Success" };
}

export async function deleteBanner(id: string) {
    try {
        await prisma.banner.delete({ where: { id } });
    } catch (error) {
        console.error("Delete Banner Error:", error);
        return { message: "Gagal menghapus banner." };
    }
    revalidatePath("/admin/banners");
    revalidatePath("/");
}

export async function toggleBannerStatus(id: string, isActive: boolean) {
    try {
        await prisma.banner.update({
            where: { id },
            data: { isActive },
        });
    } catch (error) {
        console.error("Toggle Banner Error:", error);
    }
    revalidatePath("/admin/banners");
    revalidatePath("/");
}
