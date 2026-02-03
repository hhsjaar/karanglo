import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-100 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand & Desc */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl font-bold tracking-tight text-white">Desa Karanglo</span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            Website resmi Pemerintah Desa Karanglo, Kecamatan Polanharjo, Kabupaten Klaten.
                            Media informasi transparan dan pelayanan publik digital yang modern.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 rounded-full">
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 rounded-full">
                                <Instagram className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 rounded-full">
                                <Twitter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Menu Utama</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/profil" className="hover:text-primary transition-colors">Profil Desa</Link></li>
                            <li><Link href="/data-penduduk" className="hover:text-primary transition-colors">Data Penduduk</Link></li>
                            <li><Link href="/apb-desa" className="hover:text-primary transition-colors">Transparansi APBDes</Link></li>
                            <li><Link href="/potensi" className="hover:text-primary transition-colors">Potensi & Wisata</Link></li>
                            <li><Link href="/layanan" className="hover:text-primary transition-colors">Layanan Masyarakat</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Kontak Kami</h3>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span>Jl. Raya Karanglo No. 1, Polanharjo, Klaten, Jawa Tengah 57474</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span>(0272) 1234567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span>admin@karanglo.desa.id</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Layanan Aduan</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Sampaikan aspirasi atau pengaduan Anda secara langsung melalui sistem kami.
                        </p>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium">Buat Pengaduan</Button>
                    </div>
                </div>

                <div className="pt-8 mt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Pemerintah Desa Karanglo. All rights reserved.</p>
                    <p>Built with ❤️ for Indonesia Maju</p>
                </div>
            </div>
        </footer>
    )
}
