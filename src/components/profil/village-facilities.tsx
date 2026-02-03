"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Building2, GraduationCap, HeartPulse, Store } from "lucide-react"

const MOCK_FACILITIES = [
    {
        category: "Pendidikan",
        icon: GraduationCap,
        items: ["SD Negeri 1 Karanglo", "TK Pertiwi", "PAUD Ceria"]
    },
    {
        category: "Kesehatan",
        icon: HeartPulse,
        items: ["Posyandu Lansia", "Posyandu Balita", "Polindes"]
    },
    {
        category: "Perekonomian",
        icon: Store,
        items: ["Pasar Desa", "BUMDes Maju Jaya", "Koperasi Tani"]
    },
    {
        category: "Fasilitas Umum",
        icon: Building2,
        items: ["Balai Desa", "Masjid Jami'", "Lapangan Olahraga"]
    }
]

const MOCK_INSTITUTIONS = [
    { name: "BPD (Badan Permusyawaratan Desa)", desc: "Mitra kerja pemerintah desa dalam pengawasan." },
    { name: "LPMD (Lembaga Pemberdayaan Masyarakat Desa)", desc: "Wadah partisipasi masyarakat dalam pembangunan." },
    { name: "PKK (Pemberdayaan Kesejahteraan Keluarga)", desc: "Gerakan nasional dalam pembangunan keluarga." },
    { name: "Karang Taruna", desc: "Organisasi kepemudaan desa untuk kegiatan positif." }
]

export function VillageFacilities() {
    return (
        <div className="grid lg:grid-cols-2 gap-12">
            {/* Lembaga Desa */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold">Lembaga Desa</h3>
                <div className="grid gap-4">
                    {MOCK_INSTITUTIONS.map((inst, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {inst.name.substring(0, 1)}
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground">{inst.name}</h4>
                                <p className="text-sm text-muted-foreground">{inst.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fasilitas Desa */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold">Fasilitas Desa</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    {MOCK_FACILITIES.map((facility, i) => (
                        <Card key={i} className="border-0 shadow-none bg-slate-50 dark:bg-slate-900">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm text-primary">
                                        <facility.icon className="h-6 w-6" />
                                    </div>
                                    <h4 className="font-semibold">{facility.category}</h4>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                        {facility.items.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
