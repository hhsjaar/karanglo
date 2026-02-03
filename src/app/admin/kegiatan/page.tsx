import { getActivities, deleteActivity } from "@/actions/admin-activity";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const dynamic = 'force-dynamic';

export default async function AdminActivityPage() {
    const activities = await getActivities();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Kegiatan & Berita</h1>
                    <p className="text-muted-foreground">Kelola berita, artikel, dan agenda desa.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/kegiatan/new">
                        <Plus className="mr-2 h-4 w-4" /> Tambah Berita
                    </Link>
                </Button>
            </div>

            <div className="border rounded-lg bg-white dark:bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Judul</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Penulis</TableHead>
                            <TableHead className="w-[150px] text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activities.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="whitespace-nowrap font-mono text-xs">
                                    {format(new Date(item.publishedAt), "dd MMM yyyy", { locale: id })}
                                </TableCell>
                                <TableCell className="font-medium max-w-[300px] truncate">{item.title}</TableCell>
                                <TableCell>
                                    <Badge variant={item.category === 'NEWS' ? 'default' : 'secondary'}>{item.category}</Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">{item.author}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/kegiatan/edit/${item.id}`}>Edit</Link>
                                    </Button>
                                    <DeleteButton action={deleteActivity.bind(null, item.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
