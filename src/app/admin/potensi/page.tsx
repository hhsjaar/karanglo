import { getPotencies, deletePotency } from "@/actions/admin-potency";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getVillageProfile } from "@/actions/admin-profile";
import { PotencyHeaderSettings } from "@/components/admin/potency-header-settings";

export const dynamic = 'force-dynamic';

export default async function AdminPotencyPage() {
    const potencies = await getPotencies();
    const profile = await getVillageProfile();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Potensi Desa</h1>
                    <p className="text-muted-foreground">Kelola data potensi, UMKM, dan program desa.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/potensi/new">
                        <Plus className="mr-2 h-4 w-4" /> Tambah Potensi
                    </Link>
                </Button>
            </div>

            <PotencyHeaderSettings profile={profile} />

            <div className="border rounded-lg bg-white dark:bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Judul</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead className="hidden md:table-cell">Slug</TableHead>
                            <TableHead className="w-[150px] text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {potencies.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.title}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{item.category}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-muted-foreground">{item.slug}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/potensi/edit/${item.id}`}>Edit</Link>
                                    </Button>
                                    <DeleteButton action={deletePotency.bind(null, item.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
