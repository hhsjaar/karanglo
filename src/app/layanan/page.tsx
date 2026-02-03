"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, AlertTriangle, Send, SearchCheck } from "lucide-react"

export default function LayananPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
            <div className="bg-primary/5 py-12 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">Layanan Mandiri</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Ajukan surat keterangan atau sampaikan aspirasi Anda secara online. Cepat, Mudah, dan Transparan.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <Tabs defaultValue="surat" className="space-y-8">
                    <div className="flex justify-center">
                        <TabsList className="grid w-full max-w-[600px] grid-cols-2 p-1 bg-slate-200 dark:bg-slate-800 rounded-full h-auto">
                            <TabsTrigger value="surat" className="gap-2 py-3 rounded-full text-base">
                                <FileText className="h-5 w-5" /> Permohonan Surat
                            </TabsTrigger>
                            <TabsTrigger value="aduan" className="gap-2 py-3 rounded-full text-base">
                                <AlertTriangle className="h-5 w-5" /> Pengaduan Warga
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* PERMOHONAN SURAT */}
                    <TabsContent value="surat" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="border-none shadow-md">
                            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 border-b">
                                <CardTitle className="text-2xl text-blue-700 dark:text-blue-400">Formulir Permohonan Surat</CardTitle>
                                <CardDescription>Isi data dengan benar. Surat akan diproses dalam 1x24 jam kerja.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="nik">NIK (Nomor Induk Kependudukan)</Label>
                                            <Input id="nik" placeholder="16 digit NIK" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="nama">Nama Lengkap</Label>
                                            <Input id="nama" placeholder="Sesuai KTP" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="jenis_surat">Jenis Surat</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Jenis Surat" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sku">Surat Keterangan Usaha (SKU)</SelectItem>
                                                <SelectItem value="sktm">Surat Keterangan Tidak Mampu (SKTM)</SelectItem>
                                                <SelectItem value="skck">Pengantar SKCK</SelectItem>
                                                <SelectItem value="domisili">Surat Keterangan Domisili</SelectItem>
                                                <SelectItem value="pindah">Surat Pengantar Pindah</SelectItem>
                                                <SelectItem value="kelahiran">Surat Keterangan Kelahiran</SelectItem>
                                                <SelectItem value="kematian">Surat Keterangan Kematian</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="keperluan">Keperluan</Label>
                                        <Textarea id="keperluan" placeholder="Jelaskan kegunaan surat ini..." />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="lampiran">Lampiran (Foto KTP/KK)</Label>
                                        <Input id="lampiran" type="file" />
                                        <p className="text-xs text-muted-foreground">Format: JPG, PNG, PDF. Maks 2MB.</p>
                                    </div>

                                    <div className="pt-4">
                                        <Button type="submit" size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                                            <Send className="mr-2 h-4 w-4" /> Kirim Permohonan
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Tracking Box */}
                        <Card className="bg-slate-50 border-dashed border-2">
                            <CardContent className="p-8 text-center space-y-4">
                                <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                                    <SearchCheck className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <h3 className="font-semibold text-lg">Cek Status Permohonan</h3>
                                <div className="flex max-w-sm mx-auto gap-2">
                                    <Input placeholder="Masukkan Kode Tiket..." />
                                    <Button variant="secondary">Lacak</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* PENGADUAN */}
                    <TabsContent value="aduan" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="border-none shadow-md">
                            <CardHeader className="bg-orange-50 dark:bg-orange-900/10 border-b">
                                <CardTitle className="text-2xl text-orange-700 dark:text-orange-400">Layanan Pengaduan Warga</CardTitle>
                                <CardDescription>Sampaikan kritik, saran, atau laporan masalah lingkungan. Identitas pelapor dirahasiakan jika diminta.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama_pelapor">Nama (Opsional)</Label>
                                            <Input id="nama_pelapor" placeholder="Boleh dikosongkan" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="wa">No. WhatsApp</Label>
                                            <Input id="wa" placeholder="Untuk konfirmasi tindak lanjut" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="kategori">Kategori Laporan</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="infrastruktur">Infrastruktur (Jalan/Jembatan Rusak)</SelectItem>
                                                <SelectItem value="kebersihan">Kebersihan & Sampah</SelectItem>
                                                <SelectItem value="administrasi">Pelayanan Administrasi</SelectItem>
                                                <SelectItem value="keamanan">Keamanan & Ketertiban</SelectItem>
                                                <SelectItem value="lainnya">Lainnya</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="isi">Isi Laporan</Label>
                                        <Textarea id="isi" className="min-h-[150px]" placeholder="Ceritakan detail masalah, lokasi, dan waktu kejadian..." />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bukti">Bukti Foto (Jika ada)</Label>
                                        <Input id="bukti" type="file" />
                                    </div>

                                    <div className="pt-4">
                                        <Button type="submit" size="lg" className="w-full md:w-auto bg-orange-600 hover:bg-orange-700">
                                            <Send className="mr-2 h-4 w-4" /> Kirim Laporan
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
