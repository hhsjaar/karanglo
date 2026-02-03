import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// MOCK DATA (Should match main page or be fetched)
const MOCK_DETAIL = {
    title: "Wisata Air River Tubing",
    category: "Wisata",
    description: "Nikmati sensasi menyusuri sungai jernih dengan ban. Destinasi favorit keluarga yang memacu adrenalin namun tetap aman.",
    content: `
        <p>River Tubing Karanglo menawarkan pengalaman menyusuri sungai alami sepanjang 2 KM dengan durasi sekitar 45 menit. Air yang jernih berasal langsung dari mata air alami (Umbul) membuat pengalaman ini menyegarkan.</p>
        <h3>Fasilitas:</h3>
        <ul>
            <li>Ban Tubing Standar Safety</li>
            <li>Helm & Pelampung</li>
            <li>Pemandu Profesional</li>
            <li>Dokumentasi Foto/Video</li>
            <li>Makan Siang Prasmanan Desa</li>
        </ul>
        <h3>Harga Paket:</h3>
        <p>Mulai dari Rp 45.000,- per orang (Minimal 10 orang).</p>
    `,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    location: "Dusun II, Karanglo, Polanharjo",
    contact: "0812-3456-7890 (BUMDes)",
    economicVal: "Omset Rp 500jt / Tahun"
}

export default async function PotensiDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // In real app, fetch(params.slug)

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
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-200">
                            {/* Main Image Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold text-xl">
                                Image Full: {MOCK_DETAIL.title}
                            </div>
                        </div>

                        <div>
                            <Badge className="mb-4">{MOCK_DETAIL.category}</Badge>
                            <h1 className="text-4xl font-bold mb-4">{MOCK_DETAIL.title}</h1>
                            <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: MOCK_DETAIL.content }} />
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-card p-6 rounded-xl border shadow-sm space-y-6 sticky top-24">
                            <div>
                                <h3 className="font-semibold text-lg mb-4">Informasi Detail</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 text-muted-foreground">
                                        <MapPin className="h-5 w-5 text-primary shrink-0" />
                                        <span>{MOCK_DETAIL.location}</span>
                                    </div>
                                    <div className="flex items-start gap-3 text-muted-foreground">
                                        <Phone className="h-5 w-5 text-primary shrink-0" />
                                        <span>{MOCK_DETAIL.contact}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t">
                                <h4 className="font-semibold mb-2">Nilai Ekonomi</h4>
                                <p className="text-2xl font-bold text-emerald-600">{MOCK_DETAIL.economicVal}</p>
                            </div>

                            <Button className="w-full text-lg h-12">Hubungi Pengelola</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
