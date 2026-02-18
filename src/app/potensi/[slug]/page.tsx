import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getPotencyBySlug } from "@/actions/admin-potency"
import { notFound } from "next/navigation"

export default async function PotensiDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const potency = await getPotencyBySlug(slug);

    if (!potency) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-8">
                    <Link href="/potensi">
                        <Button variant="ghost" className="hover:bg-slate-200"><ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Potensi</Button>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-200 shadow-lg">
                            <Image
                                src={potency.thumbnail || "/placeholder.svg"}
                                alt={potency.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="space-y-4">
                            <Badge className="px-3 py-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none">
                                {potency.category}
                            </Badge>
                            <h1 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                                {potency.title}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-emerald-500 pl-4">
                                {potency.description}
                            </p>
                            <div className="prose prose-lg dark:prose-invert max-w-none pt-4" dangerouslySetInnerHTML={{ __html: potency.content }} />
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-card p-8 rounded-2xl border shadow-xl space-y-6 sticky top-24">
                            <div>
                                <h3 className="font-bold text-xl mb-6 text-slate-800 dark:text-slate-100">Informasi Detail</h3>
                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-emerald-50 p-2 rounded-lg dark:bg-emerald-900/30">
                                            <MapPin className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-500 uppercase">Lokasi</p>
                                            <p className="text-slate-700 dark:text-slate-300">{potency.location || "Kontak Admin"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-emerald-50 p-2 rounded-lg dark:bg-emerald-900/30">
                                            <Phone className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-500 uppercase">Kontak</p>
                                            <p className="text-slate-700 dark:text-slate-300">{potency.contact || "-"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {potency.economicVal && (
                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <h4 className="font-semibold text-slate-500 uppercase text-xs tracking-wider mb-2">Nilai/Dampak Ekonomi</h4>
                                    <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{potency.economicVal}</p>
                                </div>
                            )}

                            <Button className="w-full text-lg h-14 bg-emerald-600 hover:bg-emerald-700 transition-all font-bold rounded-xl shadow-lg shadow-emerald-500/20">
                                Hubungi Pengelola
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
