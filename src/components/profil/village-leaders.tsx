"use client"

import Image from "next/image"

export function VillageLeaders() {
    return (
        <div className="flex justify-center w-full py-8">
            <div className="relative w-full max-w-4xl aspect-[16/9] md:aspect-[3/2] lg:aspect-[2/1] bg-slate-100 rounded-2xl overflow-hidden shadow-xl border">
                <Image
                    src="/bagan.jpg"
                    alt="Struktur Organisasi Desa Karanglo"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    )
}
