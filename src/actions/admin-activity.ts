"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ActivityCategory } from "@prisma/client";
import { redirect } from "next/navigation";

// --- ACTIVITY ACTIONS ---

export async function getActivities() {
    return await prisma.activity.findMany({
        orderBy: { publishedAt: "desc" },
    });
}
export async function getActivity(id: string) {
    return await prisma.activity.findUnique({ where: { id } });
}

export async function createActivity(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as ActivityCategory;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const thumbnail = formData.get("thumbnail") as string;
    const author = formData.get("author") as string;
    const publishedAtStr = formData.get("publishedAt") as string;
    const publishedAt = publishedAtStr ? new Date(publishedAtStr) : new Date();

    if (!title || !slug || !content) {
        return { message: "Judul, Slug, dan Konten wajib diisi." };
    }

    try {
        await prisma.activity.create({
            data: {
                title,
                slug,
                category,
                excerpt,
                content,
                thumbnail: thumbnail || "/placeholder.svg",
                author,
                publishedAt,
                images: [] // Future: Multiple images
            },
        });
    } catch (error) {
        console.error("Create Activity Error:", error);
        return { message: "Gagal membuat berita (Cek slug unik)." };
    }

    revalidatePath("/admin/kegiatan");
    revalidatePath("/kegiatan");
    redirect("/admin/kegiatan");
}

export async function updateActivity(id: string, prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as ActivityCategory;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const thumbnail = formData.get("thumbnail") as string;
    const author = formData.get("author") as string;
    const publishedAtStr = formData.get("publishedAt") as string;

    try {
        await prisma.activity.update({
            where: { id },
            data: {
                title,
                slug,
                category,
                excerpt,
                content,
                thumbnail,
                author,
                publishedAt: publishedAtStr ? new Date(publishedAtStr) : undefined,
            },
        });
    } catch (error) {
        console.error("Update Activity Error:", error);
        return { message: "Gagal mengupdate berita." };
    }

    revalidatePath("/admin/kegiatan");
    revalidatePath("/kegiatan");
    redirect("/admin/kegiatan");
}

export async function deleteActivity(id: string) {
    try {
        await prisma.activity.delete({ where: { id } });
    } catch (error) {
        console.error("Delete Activity Error:", error);
    }
    revalidatePath("/admin/kegiatan");
    revalidatePath("/kegiatan");
}
