"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Banner {
    id: string;
    title: string;
    description: string | null;
    image: string;
    link: string | null;
}

const DEFAULT_BANNERS: Banner[] = [
    {
        id: "1",
        title: "Selamat Datang di Desa Karanglo",
        description: "Mewujudkan Desa Mandiri, Sejahtera, dan Berbudaya melalui inovasi digital dan pemberdayaan masyarakat.",
        image: "https://images.unsplash.com/photo-1518182170546-0766acfb0b93?q=80&w=2000",
        link: "/profil"
    },
    {
        id: "2",
        title: "Wisata Air & Edukasi",
        description: "Nikmati kesegaran mata air alami dan wahana river tubing yang memacu adrenalin di jantung desa kami.",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000",
        link: "/potensi"
    },
    {
        id: "3",
        title: "Transparansi Anggaran",
        description: "Kami berkomitmen pada keterbukaan informasi publik dan akuntabilitas pengelolaan dana desa.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000",
        link: "/apb-desa"
    }
];

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

interface HeroSliderProps {
    banners?: Banner[];
}

export function HeroSlider({ banners: propBanners = DEFAULT_BANNERS }: HeroSliderProps) {
    // If propBanners is empty array (e.g. no banners in DB), fall back to default
    const activeBanners = propBanners.length > 0 ? propBanners : DEFAULT_BANNERS;

    const [[currentIndex, direction], setPage] = useState([0, 0]);

    // Derived state for auto-play reference avoiding dependency loops
    const index = Math.abs(currentIndex % activeBanners.length);
    const currentBanner = activeBanners[index];

    const paginate = (newDirection: number) => {
        setPage([currentIndex + newDirection, newDirection]);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 6000);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]); // Reset timer on interaction

    return (
        <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-slate-900">
            {/* Background Images Slider */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={currentBanner.image}
                        alt={currentBanner.title}
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-black/30 bg-black/40" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="container relative z-10 px-4 md:px-6 text-center text-white space-y-8 max-w-5xl mx-auto pt-20">
                <motion.div
                    key={`content-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6"
                >
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-block py-2 px-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs md:text-sm font-semibold tracking-wide uppercase shadow-lg"
                    >
                        Website Resmi Pemerintah Desa
                    </motion.span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight drop-shadow-2xl text-white">
                        {currentBanner.title}
                    </h1>
                </motion.div>

                <motion.div
                    key={`desc-${index}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-3xl mx-auto"
                >
                    <p className="text-lg md:text-2xl text-white/90 font-medium leading-relaxed drop-shadow-md">
                        {currentBanner.description}
                    </p>
                </motion.div>

                <motion.div
                    key={`btn-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                >
                    <Button size="lg" className="h-14 px-10 rounded-full text-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 hover:scale-105 transition-all" asChild>
                        <Link href={currentBanner.link || "#"}>
                            Jelajahi
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>

            {/* Slider Controls */}
            {activeBanners.length > 1 && (
                <>
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/5 text-white hover:bg-white/20 transition-all backdrop-blur-md border border-white/10 active:scale-90 hidden md:block"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/5 text-white hover:bg-white/20 transition-all backdrop-blur-md border border-white/10 active:scale-90 hidden md:block"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-8 w-8" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3 p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
                        {activeBanners.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setPage([idx, idx > index ? 1 : -1])}
                                className={`h-2.5 rounded-full transition-all duration-500 ease-out ${idx === index
                                    ? "w-8 bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]"
                                    : "w-2.5 bg-white/40 hover:bg-white/70"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-20"
            >
                <div className="animate-bounce p-2 rounded-full border border-white/10 bg-black/10 backdrop-blur-sm">
                    <ChevronDown className="h-6 w-6" />
                </div>
            </motion.div>
        </section>
    );
}
