"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getResidents() {
    return await prisma.resident.findMany({
        orderBy: { name: 'asc' }
    });
}

export async function createResident(data: any) {
    try {
        await prisma.resident.create({
            data: {
                ...data,
                birthDate: new Date(data.birthDate),
            },
        });
        revalidatePath("/admin/penduduk");
        revalidatePath("/data-penduduk");
        return { success: true };
    } catch (error) {
        console.error("Create Resident Error:", error);
        return { error: "Gagal menambahkan data penduduk." };
    }
}

export async function updateResident(id: string, data: any) {
    try {
        await prisma.resident.update({
            where: { id },
            data: {
                ...data,
                birthDate: new Date(data.birthDate),
            },
        });
        revalidatePath("/admin/penduduk");
        revalidatePath("/data-penduduk");
        return { success: true };
    } catch (error) {
        console.error("Update Resident Error:", error);
        return { error: "Gagal memperbarui data penduduk." };
    }
}

export async function deleteResident(id: string) {
    try {
        await prisma.resident.delete({
            where: { id },
        });
        revalidatePath("/admin/penduduk");
        revalidatePath("/data-penduduk");
        return { success: true };
    } catch (error) {
        console.error("Delete Resident Error:", error);
        return { error: "Gagal menghapus data penduduk." };
    }
}
