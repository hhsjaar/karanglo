"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- PROFILE ACTIONS ---

export async function getVillageProfile() {
    return await prisma.villageProfile.upsert({
        where: { id: "default" },
        update: {},
        create: {
            id: "default",
            name: "Desa Karanglo",
            description: "Deskripsi desa...",
            vision: "-",
            mission: "-",
            history: "-",
            areaSize: 0,
            populationCount: 0,
            address: "-",
            phone: "-",
        },
    });
}

export async function updateProfile(prevState: any, formData: FormData) {
    const data: any = {};
    const fields = ["name", "description", "vision", "mission", "history", "address", "phone", "email", "mapEmbedUrl", "headerBgProfil", "headerBgPotensi", "imgBalaiDesa", "imgKegiatan", "imgWisata", "imgPanen"];

    fields.forEach(field => {
        const value = formData.get(field);
        if (value !== null) {
            data[field] = value as string;
        }
    });

    try {
        await prisma.villageProfile.update({
            where: { id: "default" },
            data,
        });
    } catch (error) {
        console.error("Update Profile Error:", error);
        return { message: "Gagal mengupdate profil." };
    }

    revalidatePath("/admin/profil");
    revalidatePath("/profil");
    revalidatePath("/");
    return { message: "Profil berhasil diperbarui!" };
}
