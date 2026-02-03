import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const MOCK_DETAIL = {
    title: "Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) TA 2025",
    date: "2024-01-15",
    author: "Admin Desa",
    category: "Pemerintahan",
    image: "/placeholder.svg",
    content: `
        <p class="lead">Desa Karanglo telah sukses menyelenggarakan Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) untuk Tahun Anggaran 2025 pada hari Senin, 15 Januari 2024.</p>
        
        <p>Acara yang bertempat di Balai Desa Karanglo ini dihadiri oleh Kepala Desa, Perangkat Desa, BPD, tokoh masyarakat, perwakilan RT/RW, serta unsur pemuda dan perempuan. Musrenbangdes merupakan forum musyawarah tahunan para pemangku kepentingan desa untuk menyepakati Rencana Kerja Pemerintah Desa (RKP Desa).</p>

        <h3>Prioritas Pembangunan</h3>
        <p>Dalam musyawarah kali ini, disepakati beberapa prioritas pembangunan fisik maupun non-fisik, antara lain:</p>
        <ul>
            <li>Perbaikan saluran irigasi pertanian di Dusun II.</li>
            <li>Peningkatan jalan usaha tani untuk memudahkan distribusi hasil panen.</li>
            <li>Pelatihan kewirausahaan digital untuk pelaku UMKM.</li>
            <li>Program pemberian makanan tambahan (PMT) untuk pencegahan stunting.</li>
        </ul>

        <p>Kepala Desa Karanglo, Bpk. Yudi Kusuma, dalam sambutannya menyampaikan pentingnya partisipasi aktif warga dalam mengawal pembangunan desa. "Desa ini milik kita bersama, mari kita bangun dengan semangat gotong royong," ujarnya.</p>

        <blockquote>
            "Transparansi dan akuntabilitas adalah kunci utama dalam pengelolaan dana desa yang kami pegang teguh."
        </blockquote>
    `
}

export default async function KegiatanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="mb-8">
                    <Link href="/kegiatan">
                        <Button variant="ghost" className="hover:bg-slate-200"><ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Berita</Button>
                    </Link>
                </div>

                <article className="bg-white dark:bg-card rounded-2xl shadow-sm border overflow-hidden">
                    <div className="relative aspect-video w-full bg-slate-200">
                        <Image
                            src={MOCK_DETAIL.image}
                            alt={MOCK_DETAIL.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 text-white">
                            <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none mb-3">{MOCK_DETAIL.category}</Badge>
                            <h1 className="text-2xl md:text-4xl font-bold leading-tight">{MOCK_DETAIL.title}</h1>
                            <div className="flex items-center gap-4 mt-4 text-sm md:text-base opacity-90">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(MOCK_DETAIL.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    {MOCK_DETAIL.author}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-12">
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground first-letter:text-5xl first-letter:font-bold first-letter:text-foreground first-letter:mr-3 first-letter:float-left"
                            dangerouslySetInnerHTML={{ __html: MOCK_DETAIL.content }}
                        />

                        <div className="flex justify-end mt-12 pt-8 border-t">
                            <Button variant="outline" className="gap-2 rounded-full">
                                <Share2 className="h-4 w-4" /> Bagikan
                            </Button>
                        </div>
                    </div>
                </article>

                {/* Related News Placeholder */}
                <div className="mt-12">
                    <h3 className="text-2xl font-bold mb-6">Berita Terkait</h3>
                    {/* Reuse generic grid or simple list */}
                </div>
            </div>
        </div>
    )
}
