"use server";

import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { createSession, deleteSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
    const errorState = { message: "" };

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
        return { message: "Username dan password wajib diisi." };
    }

    try {
        const user = await prisma.admin.findUnique({
            where: { username },
        });

        if (!user) {
            return { message: "Username tidak ditemukan." };
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            return { message: "Password salah." };
        }

        // Create session
        await createSession(user.id);

    } catch (error) {
        console.error("Login error:", error);
        return { message: "Terjadi kesalahan pada server." };
    }

    // Redirect must be outside try/catch to avoid Next.js digest error
    redirect("/admin/dashboard");
}

export async function logout() {
    await deleteSession();
    redirect("/admin/login");
}
