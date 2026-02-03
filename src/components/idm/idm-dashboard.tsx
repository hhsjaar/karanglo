"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react"

const IDM_DATA = [
    { year: 2020, score: 0.6541, status: "BERKEMBANG" },
    { year: 2021, score: 0.6892, status: "BERKEMBANG" },
    { year: 2022, score: 0.7055, status: "MAJU" },
    { year: 2023, score: 0.7588, status: "MAJU" },
    { year: 2024, score: 0.8123, status: "MANDIRI" },
]

const CURRENT_SCORES = {
    iks: 0.825, // Indeks Ketahanan Sosial
    ike: 0.764, // Indeks Ketahanan Ekonomi
    ikl: 0.848, // Indeks Ketahanan Lingkungan
    total: 0.8123,
    status: "MANDIRI",
    target: 0.8500
}

export function IdmDashboard() {
    const deficit = (CURRENT_SCORES.target - CURRENT_SCORES.total).toFixed(4);

    return (
        <div className="space-y-8">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-primary text-primary-foreground border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium opacity-90 uppercase">Status IDM 2024</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-2">{CURRENT_SCORES.status}</div>
                        <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                            Target: {CURRENT_SCORES.target}
                        </Badge>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">IKS (Sosial)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-600">{CURRENT_SCORES.iks}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">IKE (Ekonomi)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-yellow-600">{CURRENT_SCORES.ike}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">IKL (Lingkungan)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-emerald-600">{CURRENT_SCORES.ikl}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Chart Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Riwayat Nilai IDM
                    </CardTitle>
                    <CardDescription>Perkembangan Indeks Desa Membangun 5 Tahun Terakhir</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={IDM_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="year" />
                            <YAxis domain={[0.5, 1]} />
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Bar dataKey="score" fill="#059669" radius={[4, 4, 0, 0]} name="Nilai IDM" barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Analysis Section */}
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-yellow-600" />
                            Kekurangan Nilai
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg mb-4">
                            Untuk mencapai target tahun depan, Desa Karanglo membutuhkan tambahan skor sebesar:
                            <span className="font-bold text-2xl mx-2 text-foreground">{deficit}</span> poin.
                        </p>
                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm uppercase text-muted-foreground">Rekomendasi Prioritas:</h4>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                                <li>Peningkatan akses logistik ke pusat ekonomi.</li>
                                <li>Digitalisasi pelayanan publik desa (Internet Desa).</li>
                                <li>Mitigasi bencana lingkungan lebih lanjut.</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            Kesimpulan Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="prose dark:prose-invert text-sm">
                        <p>
                            Berdasarkan capaian tahun 2024, Desa Karanglo telah berhasil naik status menjadi
                            <strong className="text-green-600 mx-1">DESA MANDIRI</strong>.
                        </p>
                        <p>
                            Hal ini menunjukkan ketahanan sosial, ekonomi, dan ekologi desa telah melampaui standar minimal.
                            Desa kini memiliki otonomi lebih dalam pengelolaan dana desa untuk pemberdayaan masyarakat.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
