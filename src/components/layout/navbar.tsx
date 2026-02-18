"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Phone } from "lucide-react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Profil", href: "/profil" },
  { name: "Potensi", href: "/potensi" },
  { name: "Data Desa", href: "/ppdid" }, // Centralized Data Hub
  { name: "Layanan", href: "/layanan" },
  { name: "Berita", href: "/kegiatan" },
]

export function Navbar() {
  const pathname = usePathname()

  // Don't show navbar on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isHidden, setIsHidden] = React.useState(false)
  const { scrollY } = useScroll()
  const lastScrollY = React.useRef(0)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current
    if (latest > previous && latest > 150) {
      setIsHidden(true)
    } else {
      setIsHidden(false)
    }

    if (latest > 20) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }

    lastScrollY.current = latest
  })

  // Check if current path matches standard href or is a sub-path (e.g. /potensi/slug should activate /potensi)
  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm border-b" : "bg-transparent bg-gradient-to-b from-black/50 to-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="relative flex h-10 w-10 md:h-12 md:w-12 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-white shadow-sm group-hover:border-primary transition-colors">
              {/* Custom Logo / Initials */}
              <div className="h-full w-full bg-white flex items-center justify-center">
                <Image src="/favicon.png" alt="Logo" width={40} height={40} className="w-full h-full object-contain p-1" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={cn("text-sm md:text-lg font-bold leading-none tracking-tight transition-colors", isScrolled || pathname !== '/' ? "text-foreground" : "text-white drop-shadow-md")}>Desa Karanglo</span>
              <span className={cn("text-[10px] md:text-xs font-medium leading-none opacity-90", isScrolled || pathname !== '/' ? "text-muted-foreground" : "text-white/80 drop-shadow-md")}>Kab. Klaten</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <ul className="flex gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-emerald-400 relative py-1",
                      isActive(item.href)
                        ? "text-emerald-500 font-semibold"
                        : isScrolled || pathname !== '/' ? "text-foreground/80" : "text-white/90 hover:text-white"
                    )}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <Button size="sm" variant={isScrolled || pathname !== '/' ? "default" : "secondary"} className="gap-2 shadow-sm font-semibold rounded-full" asChild>
              <Link href="/layanan">
                <Phone className="h-4 w-4" />
                <span>Pengaduan</span>
              </Link>
            </Button>
          </nav>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("lg:hidden", !isScrolled && pathname === '/' ? "text-white hover:bg-white/10" : "")}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col gap-6 mt-6">
                <Link href="/" className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center overflow-hidden border">
                    <Image src="/favicon.png" alt="Logo" width={32} height={32} className="w-full h-full object-contain p-1" />
                  </div>
                  <span className="text-xl font-bold">Desa Karanglo</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-2 py-1 text-lg font-medium transition-colors hover:text-primary",
                        isActive(item.href) ? "text-emerald-600 font-semibold" : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <Button className="w-full gap-2 justify-start rounded-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                      <Link href="/layanan">
                        <Phone className="h-4 w-4" />
                        Layanan Pengaduan
                      </Link>
                    </Button>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
