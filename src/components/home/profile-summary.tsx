"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export function ProfileSummary() {
    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 mt-12">
                                <div className="h-48 md:h-64 rounded-2xl bg-muted overflow-hidden relative shadow-lg">
                                    {/* Placeholder */}
                                    <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">Foto Balai Desa</div>
                                </div>
                                <div className="h-40 md:h-56 rounded-2xl bg-muted overflow-hidden relative shadow-lg">
                                    {/* Placeholder */}
                                    <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">Kegiatan Warga</div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-40 md:h-56 rounded-2xl bg-muted overflow-hidden relative shadow-lg">
                                    {/* Placeholder */}
                                    <div className="absolute inset-0 bg-emerald-100 animate-pulse" />
                                    <div className="absolute inset-0 flex items-center justify-center text-emerald-600 font-medium px-4 text-center">Wisata Air</div>
                                </div>
                                <div className="h-48 md:h-64 rounded-2xl bg-muted overflow-hidden relative shadow-lg">
                                    {/* Placeholder */}
                                    <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">Panen Raya</div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl opacity-50" />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Tentang Desa Kami
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                Membangun Desa, <br />
                                <span className="text-primary">Mensejahterakan Masyarakat</span>
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Desa Karanglo bertekad menjadi desa mandiri yang menjunjung tinggi kearifan lokal.
                                Dengan dukungan teknologi dan transparansi, kami menghadirkan pelayanan publik terbaik
                                serta mengembangkan potensi ekonomi berbasis masyarakat.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-emerald-100 p-2 rounded-full text-emerald-700">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Administrasi Digital</h4>
                                    <p className="text-sm text-muted-foreground">Pelayanan surat menyurat dan data kependudukan terintegrasi.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-emerald-100 p-2 rounded-full text-emerald-700">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Pusat Ekonomi Kreatif</h4>
                                    <p className="text-sm text-muted-foreground">Pengembangan UMKM dan Wisata Air sebagai ikon desa.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-emerald-100 p-2 rounded-full text-emerald-700">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Transparan & Akuntabel</h4>
                                    <p className="text-sm text-muted-foreground">Keterbukaan informasi anggaran dan program pembangunan.</p>
                                </div>
                            </div>
                        </div>

                        <Button size="lg" className="rounded-full px-8" asChild>
                            <Link href="/profil">
                                Kenali Lebih Dekat <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
