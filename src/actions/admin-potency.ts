"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { PotencyCategory } from "@prisma/client";
import { redirect } from "next/navigation";

// --- POTENCY ACTIONS ---

export async function getPotencies() {
    return await prisma.potency.findMany({
        orderBy: { updatedAt: "desc" },
    });
}
export async function getPotency(id: string) {
    return await prisma.potency.findUnique({ where: { id } });
}
export async function getPotencyBySlug(slug: string) {
    return await prisma.potency.findUnique({ where: { slug } });
}

export async function createPotency(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as PotencyCategory;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const thumbnail = formData.get("thumbnail") as string;
    const economicVal = formData.get("economicVal") as string;
    const location = formData.get("location") as string;

    // Simple image handling for now (comma separated or single)
    const imagesRaw = formData.get("images") as string;
    const images = imagesRaw ? imagesRaw.split(",").map(s => s.trim()) : [];

    if (!title || !slug || !content) {
        return { message: "Judul, Slug, dan Konten wajib diisi." };
    }

    try {
        await prisma.potency.create({
            data: {
                title,
                slug,
                category,
                description,
                content,
                thumbnail: thumbnail || "/placeholder.svg",
                images,
                economicVal,
                location
            },
        });
    } catch (error) {
        console.error("Create Potency Error:", error);
        return { message: "Gagal membuat potensi (Cek slug unik)." };
    }

    revalidatePath("/admin/potensi");
    revalidatePath("/potensi");
    redirect("/admin/potensi");
}

export async function updatePotency(id: string, prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as PotencyCategory;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const thumbnail = formData.get("thumbnail") as string;
    const economicVal = formData.get("economicVal") as string;
    const location = formData.get("location") as string;

    const imagesRaw = formData.get("images") as string;
    const images = imagesRaw ? imagesRaw.split(",").map(s => s.trim()) : [];

    try {
        await prisma.potency.update({
            where: { id },
            data: {
                title,
                slug,
                category,
                description,
                content,
                thumbnail,
                images,
                economicVal,
                location
            },
        });
    } catch (error) {
        console.error("Update Potency Error:", error);
        return { message: "Gagal mengupdate potensi." };
    }

    revalidatePath("/admin/potensi");
    revalidatePath("/potensi");
    redirect("/admin/potensi");
}

export async function deletePotency(id: string) {
    try {
        await prisma.potency.delete({ where: { id } });
    } catch (error) {
        console.error("Delete Potency Error:", error);
    }
    revalidatePath("/admin/potensi");
    revalidatePath("/potensi");
}
