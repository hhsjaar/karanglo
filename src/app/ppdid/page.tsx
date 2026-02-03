import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, BarChart3, Users, FileText, ArrowRight } from "lucide-react"

export const metadata = {
    title: "PPDID | Desa Karanglo",
    description: "Pusat Data dan Informasi Desa Karanglo. Transparansi data kependudukan, anggaran, dan pembangunan.",
}

export default function PpdidPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
            <div className="bg-slate-900 py-16 mb-12 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Pusat Data & Informasi Desa (PPDID)</h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Portal satu pintu untuk mengakses seluruh data statistik dan indikator kinerja Desa Karanglo.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Data Penduduk */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-emerald-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Users className="h-6 w-6 text-emerald-500" />
                                Data Kependudukan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                Statistik lengkap demografi warga berdasarkan usia, pendidikan, pekerjaan, dan agama.
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-center py-2">
                                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                                    <div className="text-lg font-bold text-emerald-600">3,570</div>
                                    <div className="text-xs text-muted-foreground">Penduduk</div>
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                                    <div className="text-lg font-bold text-emerald-600">1,050</div>
                                    <div className="text-xs text-muted-foreground">KK</div>
                                </div>
                            </div>
                            <Link href="/data-penduduk" className="block">
                                <Button variant="outline" className="w-full group">
                                    Lihat Statistik <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* IDM */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-blue-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Activity className="h-6 w-6 text-blue-500" />
                                Indeks Desa Membangun
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                Pengukuran status kemajuan dan kemandirian desa berkelanjutan (SDGs Desa).
                            </p>
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg text-center">
                                <div className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Status 2024</div>
                                <div className="text-2xl font-bold text-blue-600">DESA MANDIRI</div>
                            </div>
                            <Link href="/idm" className="block">
                                <Button variant="outline" className="w-full group">
                                    Lihat Indikator <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* APB Desa */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-orange-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <BarChart3 className="h-6 w-6 text-orange-500" />
                                Transparansi Anggaran
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                Laporan realisasi Anggaran Pendapatan dan Belanja Desa (APBDes) secara berkala.
                            </p>
                            <div className="grid grid-cols-1 gap-2 text-center py-2">
                                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg flex justify-between px-4 items-center">
                                    <span className="text-xs text-muted-foreground">Pendapatan</span>
                                    <span className="font-bold text-green-600">Rp 1.075 M</span>
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg flex justify-between px-4 items-center">
                                    <span className="text-xs text-muted-foreground">Belanja</span>
                                    <span className="font-bold text-red-600">Rp 1.000 M</span>
                                </div>
                            </div>
                            <Link href="/apb-desa" className="block">
                                <Button variant="outline" className="w-full group">
                                    Lihat Rincian <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Potensi */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-purple-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <FileText className="h-6 w-6 text-purple-500" />
                                Potensi & Aset
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                Database potensi ekonomi, sumber daya alam, dan aset desa yang dikelola.
                            </p>
                            <Link href="/potensi" className="block">
                                <Button variant="outline" className="w-full group">
                                    Jelahi Potensi <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}
