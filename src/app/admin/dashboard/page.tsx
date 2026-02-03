import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, FileText, Image as ImageIcon, MapPin, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getStats() {
    const [
        newsCount,
        eventCount,
        potencyCount,
        umkmCount,
        bannerCount,
        incomeTotal
    ] = await Promise.all([
        prisma.activity.count({ where: { category: "NEWS" } }),
        prisma.activity.count({ where: { category: "EVENT" } }),
        prisma.potency.count({ where: { category: "POTENCY" } }),
        prisma.potency.count({ where: { category: "UMKM" } }),
        prisma.banner.count(),
        prisma.budget.aggregate({
            _sum: { amount: true },
            where: { type: "INCOME", year: 2024 }
        })
    ]);

    return {
        newsCount,
        eventCount,
        potencyCount,
        umkmCount,
        bannerCount,
        incomeTotal: incomeTotal._sum.amount || 0
    };
}

export default async function AdminDashboardPage() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-2">
                        Ringkasan statistik dan data Desa Karanglo.
                    </p>
                </div>
                <form action={logout}>
                    <Button variant="destructive">Logout</Button>
                </form>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Berita</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.newsCount}</div>
                        <p className="text-xs text-muted-foreground">Artikel berita dipublikasikan</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Agenda Kegiatan</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.eventCount}</div>
                        <p className="text-xs text-muted-foreground">Agenda mendatang & terlaksana</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Potensi & Wisata</CardTitle>
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.potencyCount}</div>
                        <p className="text-xs text-muted-foreground">Destinasi wisata terdaftar</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">UMKM Desa</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.umkmCount}</div>
                        <p className="text-xs text-muted-foreground">Unit usaha aktif</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Akses Cepat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/admin/kegiatan/new">
                                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 hover:border-emerald-500 hover:text-emerald-600">
                                    <FileText className="h-6 w-6" />
                                    Tulis Berita Baru
                                </Button>
                            </Link>
                            <Link href="/admin/potensi/new">
                                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 hover:border-emerald-500 hover:text-emerald-600">
                                    <MapPin className="h-6 w-6" />
                                    Tambah Potensi
                                </Button>
                            </Link>
                            <Link href="/admin/banners">
                                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 hover:border-emerald-500 hover:text-emerald-600">
                                    <ImageIcon className="h-6 w-6" />
                                    Kelola Banner
                                </Button>
                            </Link>
                            <Link href="/admin/apb">
                                <Button variant="outline" className="w-full h-24 flex flex-col gap-2 hover:border-emerald-500 hover:text-emerald-600">
                                    <CreditCard className="h-6 w-6" />
                                    Update APB Desa
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Ringkasan APB 2024</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-medium">Total Pendapatan</div>
                                <div className="text-sm font-bold text-emerald-600">
                                    Rp {(stats.incomeTotal / 1000000000).toFixed(2)} Miliar
                                </div>
                            </div>
                            <div className="h-[2px] w-full bg-slate-100" />
                            <div className="text-xs text-muted-foreground">
                                Data anggaran terbaru. Kelola detail anggaran di menu APB Desa.
                            </div>
                            <Button variant="secondary" className="w-full" asChild>
                                <Link href="/admin/apb">Lihat Detail Anggaran</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
