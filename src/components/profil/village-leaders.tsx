"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, User } from "lucide-react"
import Image from "next/image"

// Mock data until DB is ready
const MOCK_OFFICIALS = [
    {
        id: "1",
        name: "Bpk. Yudi Kusuma",
        position: "Kepala Desa",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
        description: "Menjabat sejak 2019, berfokus pada pembangunan infrastruktur dan wisata desa."
    },
    {
        id: "2",
        name: "Ibu Siti Aminah",
        position: "Sekretaris Desa",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
        description: "Bertanggung jawab atas administrasi dan pelayanan publik."
    },
    {
        id: "3",
        name: "Bpk. Budi Santoso",
        position: "Kaur Keuangan",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
        description: "Mengelola anggaran belanja desa yang transparan."
    },
    {
        id: "4",
        name: "Ibu Rina Wati",
        position: "Kaur Umum",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
        description: "Mengurusi sarana prasarana desa."
    }
]

export function VillageLeaders() {
    return (
        <div className="space-y-12">
            {/* Kepala Desa Highlight */}
            <div className="flex flex-col md:flex-row gap-8 items-center bg-card rounded-xl p-6 md:p-12 border shadow-sm">
                <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                    <Image
                        src={MOCK_OFFICIALS[0].image}
                        alt={MOCK_OFFICIALS[0].name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="text-center md:text-left space-y-4 max-w-2xl">
                    <div>
                        <Badge variant="outline" className="mb-2 border-primary text-primary px-4 py-1">Kepala Desa</Badge>
                        <h3 className="text-3xl font-bold text-foreground">{MOCK_OFFICIALS[0].name}</h3>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        "{MOCK_OFFICIALS[0].description}"
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                        {/* Social links or contact could go here */}
                    </div>
                </div>
            </div>

            {/* Other Officials Grid */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                    <Users className="h-6 w-6 text-primary" />
                    Perangkat Desa Lainnya
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_OFFICIALS.slice(1).map((official) => (
                        <Card key={official.id} className="hover:shadow-md transition-all cursor-pointer group">
                            <div className="aspect-[4/3] relative overflow-hidden bg-slate-100 rounded-t-xl">
                                <Image
                                    src={official.image}
                                    alt={official.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <CardHeader>
                                <div className="space-y-1">
                                    <p className="text-primary font-medium text-sm tracking-wide uppercase">{official.position}</p>
                                    <CardTitle className="text-lg">{official.name}</CardTitle>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {official.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
