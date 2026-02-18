import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSlider } from "@/components/home/hero-slider"
import { KeyStats } from "@/components/home/key-stats"
import { ProfileSummary } from "@/components/home/profile-summary"
import { PotencyHighlight } from "@/components/home/potency-highlight"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Users, Activity, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { getBanners } from "@/actions/admin-banner";
import { getPotencies } from "@/actions/admin-potency";
import { getVillageProfile } from "@/actions/admin-profile";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const banners = await getBanners();
  const potencies = await getPotencies();
  const profile = await getVillageProfile();

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">

      {/* Hero Section */}
      <HeroSlider banners={banners} />

      {/* Key Stats (Quick Access) */}
      <div className="-mt-16 relative z-20 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl">
          <Link href="/data-penduduk" className="flex flex-col items-center justify-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors group text-center">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6" />
            </div>
            <span className="font-semibold text-sm md:text-base">Data Penduduk</span>
          </Link>
          <Link href="/apb-desa" className="flex flex-col items-center justify-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors group text-center">
            <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6" />
            </div>
            <span className="font-semibold text-sm md:text-base">Transparansi APB</span>
          </Link>
          <Link href="/idm" className="flex flex-col items-center justify-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors group text-center">
            <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Activity className="h-6 w-6" />
            </div>
            <span className="font-semibold text-sm md:text-base">Status IDM</span>
          </Link>
          <Link href="/layanan" className="flex flex-col items-center justify-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors group text-center">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Phone className="h-6 w-6" />
            </div>
            <span className="font-semibold text-sm md:text-base">Layanan</span>
          </Link>
        </div>
      </div>

      <main className="space-y-20 py-20">
        {/* Profile Summary */}
        <ProfileSummary profile={profile} />

        {/* Feature Highlights: PPDID */}
        <section className="container mx-auto px-4 md:px-6">
          <div className="bg-slate-900 rounded-3xl overflow-hidden relative text-white">
            <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10" />
            <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium text-sm border border-emerald-500/30">
                  Digital Village Ecosystem
                </div>
                <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                  Pusat Data & Informasi Desa (PPDID)
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                  Akses data statistik desa secara real-time, mulai dari demografi penduduk, anggaran transparan, hingga indeks kemajuan desa dalam satu dashboard terintegrasi.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8" asChild>
                    <Link href="/ppdid">
                      Buka PPDID <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1 w-full max-w-md">
                {/* Abstract Illustration of Charts */}
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-2xl space-y-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="h-4 bg-white/20 rounded-full w-3/4 mb-6" />
                  <div className="flex items-end gap-3 h-32">
                    <div className="flex-1 bg-emerald-500/80 rounded-t-lg h-[60%]" />
                    <div className="flex-1 bg-blue-500/80 rounded-t-lg h-[40%]" />
                    <div className="flex-1 bg-orange-500/80 rounded-t-lg h-[80%]" />
                    <div className="flex-1 bg-purple-500/80 rounded-t-lg h-[50%]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                    <div className="h-8 bg-white/10 rounded-lg" />
                    <div className="h-8 bg-white/10 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Potency Highlight */}
        <PotencyHighlight potencies={potencies} />

      </main>
    </div>
  );
}
