"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- APB ACTIONS ---

export async function getBudgets(year?: number) {
    const where = year ? { year } : {};
    return await prisma.budget.findMany({
        where,
        orderBy: [{ year: 'desc' }, { type: 'asc' }, { amount: 'desc' }]
    });
}

export async function createBudget(prevState: any, formData: FormData) {
    const year = parseInt(formData.get("year") as string);
    const type = formData.get("type") as "INCOME" | "EXPENSE" | "FINANCING";
    const category = formData.get("category") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const description = formData.get("description") as string;

    if (!category || !amount) {
        return { message: "Kategori dan Jumlah Anggaran wajib diisi." };
    }

    try {
        await prisma.budget.create({
            data: {
                year,
                type,
                category,
                amount,
                description,
            },
        });
    } catch (error) {
        console.error("Create Budget Error:", error);
        return { message: "Gagal menambahkan anggaran." };
    }

    revalidatePath("/admin/apb");
    revalidatePath("/apb-desa");
    return { message: "Success" };
}

export async function deleteBudget(id: string) {
    try {
        await prisma.budget.delete({ where: { id } });
    } catch (error) {
        console.error("Delete Budget Error:", error);
    }
    revalidatePath("/admin/apb");
    revalidatePath("/apb-desa");
}
