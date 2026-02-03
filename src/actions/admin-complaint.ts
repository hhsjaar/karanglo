"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ComplaintStatus } from "@prisma/client";

// --- COMPLAINT ACTIONS ---

export async function getComplaints() {
    return await prisma.complaint.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function updateComplaintStatus(id: string, prevState: any, formData: FormData) {
    const status = formData.get("status") as ComplaintStatus;
    const response = formData.get("response") as string;

    try {
        await prisma.complaint.update({
            where: { id },
            data: {
                status,
                response, // Admin response note
            },
        });
    } catch (error) {
        console.error("Update Complaint Error:", error);
        return { message: "Gagal mengupdate pengaduan." };
    }

    revalidatePath("/admin/layanan");
    return { message: "Status diperbarui!" };
}
