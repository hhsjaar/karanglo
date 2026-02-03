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
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const vision = formData.get("vision") as string;
    const mission = formData.get("mission") as string;
    const history = formData.get("history") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const mapEmbedUrl = formData.get("mapEmbedUrl") as string;

    try {
        await prisma.villageProfile.update({
            where: { id: "default" },
            data: {
                name,
                description,
                vision,
                mission,
                history,
                address,
                phone,
                email,
                mapEmbedUrl,
            },
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
