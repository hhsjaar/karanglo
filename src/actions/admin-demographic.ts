"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- DEMOGRAPHIC ACTIONS ---

export async function getDemographics() {
    return await prisma.demographicStat.findMany({
        orderBy: [{ category: 'asc' }, { label: 'asc' }]
    });
}

export async function updateDemographicStat(id: string, count: number) {
    try {
        await prisma.demographicStat.update({
            where: { id },
            data: { count },
        });
    } catch (error) {
        console.error("Update Stat Error:", error);
        return { message: "Gagal update data." };
    }
    revalidatePath("/admin/penduduk");
    revalidatePath("/data-penduduk"); // Public page
    return { message: "Success" };
}

// Helper to seed missing categories if not present (optional utility)
export async function seedDefaultStats() {
    // Logic to ensure default categories like Gender/Age exist
    // This can be triggered manually or on page load if empty
}
