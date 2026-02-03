import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Fish, Store, Sprout, ArrowRight, GraduationCap, TrendingUp } from "lucide-react"
import { getPotencies } from "@/actions/admin-potency"
import Image from "next/image"

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Potensi Desa | Desa Karanglo",
    description: "Jelajahi potensi wisata air, UMKM, dan pertanian unggulan Desa Karanglo.",
}

export default async function PotensiPage() {
    const potencies = await getPotencies();

    // Separate main highlight (Wisata Air / priority) if any, or just pick first
    // ideally we would have a 'isFeatured' flag but for now we pick key 'Wisata'
    const featuredPotency = potencies.find((p: any) => p.category === "POTENCY") || potencies[0];
    const otherPotencies = potencies.filter((p: any) => p.id !== featuredPotency?.id);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
            <div className="bg-emerald-900 py-20 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <Badge className="mb-4 bg-emerald-500 hover:bg-emerald-600 border-none text-white text-md px-4 py-1">Kekayaan Desa</Badge>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Potensi Desa Karanglo</h1>
                    <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Dari wisata air yang menyegarkan hingga produk kreatif UMKM warga.
                        Temukan peluang dan keunikan yang membangun ekonomi desa kami.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 space-y-16">

                {/* Mata Pencaharian Dominan Banner - Can be made dynamic via VillageProfile later */}
                <div className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Sprout className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg opacity-90 font-medium">Mata Pencaharian Dominan</h3>
                            <p className="text-3xl font-bold">Petani & Buruh Tani (52%)</p>
                        </div>
                    </div>
                    <div className="flex gap-8 text-center md:text-right">
                        <div>
                            <p className="opacity-80 text-sm">Produktivitas Padi</p>
                            <p className="text-xl font-bold">6.0 Ton/Ha</p>
                        </div>
                        <div>
                            <p className="opacity-80 text-sm">Luas Lahan</p>
                            <p className="text-xl font-bold">85 Hektar</p>
                        </div>
                    </div>
                </div>

                {/* Highlight Section: Featured Potency */}
                {featuredPotency && (
                    <section>
                        <div className="flex flex-col md:flex-row gap-8 items-center bg-white dark:bg-slate-950 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="w-full md:w-1/2 aspect-video bg-emerald-100 rounded-2xl overflow-hidden relative">
                                <Image
                                    src={featuredPotency.thumbnail || "/placeholder.svg"}
                                    alt={featuredPotency.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="flex items-center gap-2 text-emerald-600 font-semibold mb-2">
                                    <Fish className="h-5 w-5" />
                                    <span>Potensi Unggulan</span>
                                </div>
                                <h2 className="text-3xl font-bold text-foreground">{featuredPotency.title}</h2>
                                <p className="text-muted-foreground leading-relaxed line-clamp-4">
                                    {featuredPotency.description}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Badge variant="secondary" className="px-3 py-1">{featuredPotency.category}</Badge>
                                </div>
                                <Button size="lg" className="rounded-full" asChild>
                                    <Link href={`/potensi/${featuredPotency.slug}`}>
                                        Lihat Detail <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Main Directory Grid */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Jelajahi Potensi Lainnya</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherPotencies.map((potency: any) => (
                            <Link href={`/potensi/${potency.slug}`} key={potency.id}>
                                <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    <div className="h-48 bg-slate-200 relative overflow-hidden shrink-0">
                                        <Image
                                            src={potency.thumbnail || "/placeholder.svg"}
                                            alt={potency.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-white/90 text-foreground hover:bg-white shadow-sm backdrop-blur-sm">{potency.category}</Badge>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="group-hover:text-primary transition-colors text-xl line-clamp-2">{potency.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grow">
                                        <p className="text-muted-foreground text-sm line-clamp-3">{potency.description}</p>
                                    </CardContent>
                                    <CardFooter className="pt-0 flex flex-wrap gap-2 text-xs text-muted-foreground mt-auto">
                                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{potency.economicVal || "Nilai Ekonomi Tinggi"}</span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* KKN Program Section */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <GraduationCap className="h-8 w-8 text-primary" />
                        <h2 className="text-2xl font-bold">Program KKN Mahasiswa</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* KKN Card 1 */}
                        <Card className="flex flex-col md:flex-row overflow-hidden hover:bg-accent/5 transition-colors cursor-pointer">
                            <div className="w-full md:w-48 aspect-video md:aspect-auto bg-slate-200 shrink-0">
                                {/* Placeholder user can replace */}
                            </div>
                            <div className="p-6 space-y-3">
                                <Badge variant="outline">KKN UNS 2024</Badge>
                                <h3 className="font-bold text-lg">Digitalisasi UMKM Desa</h3>
                                <p className="text-sm text-muted-foreground">Pelatihan pemasaran digital dan branding produk untuk 15 UMKM lokal.</p>
                                <div className="text-xs text-muted-foreground pt-2">Januari - Februari 2024</div>
                            </div>
                        </Card>
                        {/* KKN Card 2 */}
                        <Card className="flex flex-col md:flex-row overflow-hidden hover:bg-accent/5 transition-colors cursor-pointer">
                            <div className="w-full md:w-48 aspect-video md:aspect-auto bg-slate-200 shrink-0"></div>
                            <div className="p-6 space-y-3">
                                <Badge variant="outline">KKN UGM 2023</Badge>
                                <h3 className="font-bold text-lg">Pemetaan Potensi Agrowisata</h3>
                                <p className="text-sm text-muted-foreground">Masterplan pengembangan kawasan agrowisata berbasis padi organik.</p>
                                <div className="text-xs text-muted-foreground pt-2">Juli - Agustus 2023</div>
                            </div>
                        </Card>
                    </div>
                </section>
            </div>
        </div>
    )
}
