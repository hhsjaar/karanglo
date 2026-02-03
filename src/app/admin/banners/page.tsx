import { getBanners, deleteBanner, toggleBannerStatus } from "@/actions/admin-banner";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { Switch } from "@/components/ui/switch"; // We will need client component for switch wrapper

export const dynamic = 'force-dynamic';

export default async function AdminBannersPage() {
    const banners = await getBanners();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manajemen Banner</h1>
                    <p className="text-muted-foreground">Kelola gambar yang tampil di halaman utama.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/banners/new">
                        <Plus className="mr-2 h-4 w-4" /> Tambah Banner
                    </Link>
                </Button>
            </div>

            <div className="border rounded-lg shadow-sm bg-white dark:bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Preview</TableHead>
                            <TableHead>Judul</TableHead>
                            <TableHead className="hidden md:table-cell">Deskripsi</TableHead>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {banners.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                    Belum ada banner. Silakan buat baru.
                                </TableCell>
                            </TableRow>
                        ) : (
                            banners.map((banner) => (
                                <TableRow key={banner.id}>
                                    <TableCell>
                                        <div className="relative h-12 w-20 rounded overflow-hidden bg-slate-100">
                                            <Image
                                                src={banner.image}
                                                alt={banner.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {banner.title}
                                        {banner.link && (
                                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                {banner.link}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-muted-foreground truncate max-w-[300px]">
                                        {banner.description}
                                    </TableCell>
                                    <TableCell>
                                        <form action={async () => {
                                            "use server";
                                            await toggleBannerStatus(banner.id, !banner.isActive);
                                        }}>
                                            <button type="submit">
                                                <Badge variant={banner.isActive ? "default" : "secondary"} className="cursor-pointer">
                                                    {banner.isActive ? "Aktif" : "Nonaktif"}
                                                </Badge>
                                            </button>
                                        </form>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/banners/edit/${banner.id}`}>Edit</Link>
                                        </Button>
                                        <DeleteButton action={deleteBanner.bind(null, banner.id)} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
