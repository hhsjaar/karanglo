import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, Search, User } from "lucide-react"
import { getActivities } from "@/actions/admin-activity"

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Kegiatan & Berita | Desa Karanglo",
    description: "Informasi terbaru seputar kegiatan, agenda, dan berita Desa Karanglo.",
}

export default async function KegiatanPage() {
    const activities = await getActivities();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
            {/* Header */}
            <div className="bg-primary py-16 mb-12 text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Kabar Desa</h1>
                    <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                        Berita terkini, agenda kegiatan, dan transparansi informasi publik.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">

                {/* Search & Filter - Static for now, can be made client-side functional later */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center bg-white dark:bg-card p-4 rounded-xl shadow-sm border">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                        <Button variant="default" size="sm" className="rounded-full">Semua</Button>
                        <Button variant="outline" size="sm" className="rounded-full">Pemerintahan</Button>
                        <Button variant="outline" size="sm" className="rounded-full">Sosial</Button>
                        <Button variant="outline" size="sm" className="rounded-full">Wisata</Button>
                    </div>
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Cari berita..." className="pl-9 rounded-full bg-slate-50" />
                    </div>
                </div>

                {/* News Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.length === 0 ? (
                        <div className="col-span-full text-center p-12 text-muted-foreground">
                            Belum ada berita atau kegiatan.
                        </div>
                    ) : (
                        activities.map((item) => (
                            <Link href={`/kegiatan/${item.slug}`} key={item.id}>
                                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer border-none shadow-sm flex flex-col">
                                    <div className="aspect-[16/9] relative overflow-hidden bg-slate-200">
                                        <Image
                                            src={item.thumbnail || "/placeholder.svg"}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-white/90 text-foreground hover:bg-white backdrop-blur-md shadow-sm">
                                                {item.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                {item.author}
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                            {item.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="grow">
                                        <p className="text-muted-foreground text-sm line-clamp-3">
                                            {item.excerpt}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="pt-0 text-sm font-medium text-emerald-600">
                                        Baca Selengkapnya →
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))
                    )}
                </div>

                {/* Pagination Placeholder */}
                <div className="mt-12 flex justify-center">
                    <Button variant="outline" className="rounded-full">Muat Lebih Banyak</Button>
                </div>
            </div>
        </div>
    )
}
