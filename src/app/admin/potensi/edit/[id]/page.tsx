import { PotencyForm } from "@/components/admin/potency-form";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditPotencyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const potency = await prisma.potency.findUnique({
        where: { id },
    });

    if (!potency) {
        notFound();
    }

    return <PotencyForm potency={potency} isEdit />;
}
