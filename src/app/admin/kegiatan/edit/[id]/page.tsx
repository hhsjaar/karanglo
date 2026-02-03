import { ActivityForm } from "@/components/admin/activity-form";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditActivityPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const activity = await prisma.activity.findUnique({
        where: { id },
    });

    if (!activity) {
        notFound();
    }

    return <ActivityForm activity={activity} isEdit />;
}
