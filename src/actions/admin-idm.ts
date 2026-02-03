"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { IdmStatus } from "@prisma/client";

// --- IDM ACTIONS ---

export async function getIdmRecords() {
    return await prisma.idmRecord.findMany({
        orderBy: { year: "desc" },
    });
}

export async function createIdmRecord(prevState: any, formData: FormData) {
    const year = parseInt(formData.get("year") as string);
    const scoreIks = parseFloat(formData.get("scoreIks") as string);
    const scoreIke = parseFloat(formData.get("scoreIke") as string);
    const scoreIkl = parseFloat(formData.get("scoreIkl") as string);
    const scoreTotal = parseFloat(formData.get("scoreTotal") as string);
    const status = formData.get("status") as IdmStatus;
    const recommendations = formData.get("recommendations") as string;

    if (!year || !status) {
        return { message: "Tahun dan Status wajib diisi." };
    }

    try {
        await prisma.idmRecord.create({
            data: {
                year,
                scoreIks,
                scoreIke,
                scoreIkl,
                scoreTotal,
                status,
                recommendations
            },
        });
    } catch (error) {
        console.error("Create IDM Error:", error);
        return { message: "Gagal menambahkan data IDM." };
    }

    revalidatePath("/admin/idm");
    revalidatePath("/");
    return { message: "Success" };
}

export async function deleteIdmRecord(id: string) {
    try {
        await prisma.idmRecord.delete({ where: { id } });
    } catch (error) {
        console.error("Delete IDM Error:", error);
    }
    revalidatePath("/admin/idm");
    revalidatePath("/");
}
