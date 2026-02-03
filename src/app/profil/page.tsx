import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, MapPin } from "lucide-react"
import { VillageLeaders } from "@/components/profil/village-leaders"
import { VillageFacilities } from "@/components/profil/village-facilities"
import { getVillageProfile } from "@/actions/admin-profile"

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Profil Desa | Desa Karanglo",
    description: "Sejarah, Visi Misi, dan Struktur Organisasi Pemerintah Desa Karanglo.",
}

export default async function ProfilPage() {
    const profile = await getVillageProfile();

    if (!profile) {
        return <div className="p-20 text-center">Data profil belum diatur. Silahkan hubungi admin.</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
            {/* Header Hero */}
            <div className="relative bg-primary/90 py-20 mb-12 overflow-hidden text-primary-foreground">
                <div className="absolute inset-0 opacity-10">
                    <Image src="/pattern.svg" alt="Pattern" fill className="object-cover" />
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Profil {profile.name}</h1>
                    <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Mengenal lebih dekat identitas, sejarah, budaya, dan visi pembangunan {profile.name}.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <Tabs defaultValue="identitas" className="space-y-12">
                    <div className="sticky top-20 z-40 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md py-4 -mx-4 px-4 flex justify-center border-b">
                        <TabsList className="w-full max-w-[800px] grid grid-cols-4 h-auto p-1 bg-slate-200 dark:bg-slate-800 rounded-full">
                            <TabsTrigger value="identitas" className="rounded-full py-2.5">Identitas</TabsTrigger>
                            <TabsTrigger value="visimisi" className="rounded-full py-2.5">Visi Misi</TabsTrigger>
                            <TabsTrigger value="struktur" className="rounded-full py-2.5">Pemerintahan</TabsTrigger>
                            <TabsTrigger value="data" className="rounded-full py-2.5">Data & Lembaga</TabsTrigger>
                        </TabsList>
                    </div>


                    {/* TAB IDENTITAS (Sejarah & Umum) */}
                    <TabsContent value="identitas" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-8 space-y-8">
                                <Card className="overflow-hidden border-none shadow-lg">
                                    <div className="relative h-[300px] w-full">
                                        <Image
                                            src="/placeholder.svg"
                                            alt="Desa Karanglo Landscape"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                            <h2 className="text-white text-3xl font-bold">Sejarah & Asal Usul</h2>
                                        </div>
                                    </div>
                                    <CardContent className="p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: profile.history || "Belum ada data sejarah." }} />
                                    </CardContent>
                                </Card>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader><CardTitle>Profil Singkat</CardTitle></CardHeader>
                                        <CardContent className="space-y-2 text-sm md:text-base">
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-muted-foreground">Kecamatan</span>
                                                <span className="font-medium">Polanharjo</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-muted-foreground">Kabupaten</span>
                                                <span className="font-medium">Klaten</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-muted-foreground">Provinsi</span>
                                                <span className="font-medium">Jawa Tengah</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-muted-foreground">Kode Pos</span>
                                                <span className="font-medium">57474</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader><CardTitle>Kontak Desa</CardTitle></CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-muted-foreground">
                                                <li>Email: {profile.email}</li>
                                                <li>Telepon: {profile.phone}</li>
                                                <li>Alamat: {profile.address}</li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div className="lg:col-span-4 space-y-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-primary" />
                                            Lokasi Wilayah
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="aspect-square w-full bg-slate-200">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.2697839356345!2d110.6384!3d-7.6543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzknMTUuNSJTIDExMMKwMzgnMTguMiJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* TAB VISI MISI */}
                    <TabsContent value="visimisi" className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 sticky top-24">
                                <CardHeader className="text-center pb-2 pt-12">
                                    <div className="mx-auto p-4 rounded-full bg-primary/20 text-primary w-fit mb-4">
                                        <Target className="h-12 w-12" />
                                    </div>
                                    <CardTitle className="text-4xl font-bold text-primary">VISI</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center p-8 md:p-12">
                                    <p className="text-2xl font-serif font-medium leading-relaxed italic text-foreground/90">
                                        "{profile.vision}"
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-primary shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-3xl font-bold">Misi Pembangunan</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6 pt-6">
                                    <div dangerouslySetInnerHTML={{ __html: profile.mission || "Belum ada data." }} className="prose dark:prose-invert" />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* TAB PEMERINTAHAN (Structure & Leaders) */}
                    <TabsContent value="struktur" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">Struktur Organisasi Pemerintahan</h2>
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    Pemerintah {profile.name} bekerja secara profesional dan amanah untuk melayani masyarakat.
                                </p>
                            </div>
                            <VillageLeaders />
                        </div>
                    </TabsContent>

                    {/* TAB DATA & LEMBAGA (Facilities etc) */}
                    <TabsContent value="data" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <VillageFacilities />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
