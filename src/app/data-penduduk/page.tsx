import { Users, Baby, GraduationCap, Briefcase, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PopulationCharts } from "@/components/data-penduduk/population-charts"

export const metadata = {
    title: "Data Penduduk | Desa Karanglo",
    description: "Statistik demografi penduduk Desa Karanglo.",
}

export default function DataPendudukPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
            <div className="bg-primary/5 py-12 mb-12 border-b">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Demografi Desa</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Data statistik kependudukan Desa Karanglo update Tahun 2024.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 space-y-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    <Card className="bg-blue-500 text-white border-0 shadow-lg">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-blue-100 text-sm font-medium uppercase tracking-wider">Total Penduduk</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <Users className="h-8 w-8 text-blue-200" />
                                <div className="text-3xl font-bold">3,570</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-emerald-500 text-white border-0 shadow-lg">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-emerald-100 text-sm font-medium uppercase tracking-wider">Kepala Keluarga</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <Heart className="h-8 w-8 text-emerald-200" />
                                <div className="text-3xl font-bold">1,050</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-orange-500 text-white border-0 shadow-lg">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-orange-100 text-sm font-medium uppercase tracking-wider">Laki-laki</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold opacity-80">♂</span>
                                <div className="text-3xl font-bold">1,750</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-pink-500 text-white border-0 shadow-lg">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-pink-100 text-sm font-medium uppercase tracking-wider">Perempuan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold opacity-80">♀</span>
                                <div className="text-3xl font-bold">1,820</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Componenets */}
                <PopulationCharts />
            </div>
        </div>
    )
}
