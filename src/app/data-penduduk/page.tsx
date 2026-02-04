import { Users, Baby, GraduationCap, Briefcase, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PopulationCharts } from "@/components/data-penduduk/population-charts"
import { PublicResidentList } from "@/components/data-penduduk/public-resident-list"
import { getResidents } from "@/actions/admin-resident"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
    title: "Data Penduduk | Desa Karanglo",
    description: "Statistik demografi penduduk Desa Karanglo.",
}

export default async function DataPendudukPage() {
    const residents = await getResidents()

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
            <div className="bg-emerald-600 py-16 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Demografi Desa</h1>
                    <p className="text-emerald-50 text-lg max-w-2xl mx-auto">
                        Transparansi data statistik kependudukan Desa Karanglo update Tahun 2024.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 space-y-12">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    <Card className="bg-white dark:bg-slate-950 border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">Total Penduduk</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold">3,570</div>
                                <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                    <Users className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-slate-950 border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">Kepala Keluarga</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold">1,050</div>
                                <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                                    <Heart className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-slate-950 border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">Laki-laki</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold">1,750</div>
                                <div className="h-10 w-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-xl font-bold">
                                    ♂
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-slate-950 border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">Perempuan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold">1,820</div>
                                <div className="h-10 w-10 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center text-xl font-bold">
                                    ♀
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="stats" className="w-full">
                    <div className="flex justify-center mb-8">
                        <TabsList className="bg-white dark:bg-slate-950 border p-1 rounded-full h-12 shadow-sm">
                            <TabsTrigger value="stats" className="rounded-full px-8 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Statistik</TabsTrigger>
                            <TabsTrigger value="list" className="rounded-full px-8 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Daftar Penduduk</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="stats" className="mt-0">
                        <PopulationCharts />
                    </TabsContent>

                    <TabsContent value="list" className="mt-0">
                        <PublicResidentList residents={residents} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
