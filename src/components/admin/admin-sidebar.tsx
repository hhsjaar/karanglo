"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Image as ImageIcon,
    Building2,
    Users,
    FileText,
    Activity,
    Sprout,
    Newspaper,
    MessageSquare,
    LogOut,
    Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";

const menuItems = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Spanduk / Banner",
        href: "/admin/banners",
        icon: ImageIcon,
    },
    {
        title: "Profil Desa",
        href: "/admin/profil",
        icon: Building2,
    },
    {
        title: "Data Penduduk",
        href: "/admin/penduduk",
        icon: Users,
    },
    {
        title: "APB Desa",
        href: "/admin/apb",
        icon: FileText,
    },
    {
        title: "Status IDM",
        href: "/admin/idm",
        icon: Activity,
    },
    {
        title: "Potensi Desa",
        href: "/admin/potensi",
        icon: Sprout,
    },
    {
        title: "Kegiatan & Berita",
        href: "/admin/kegiatan",
        icon: Newspaper,
    },
    {
        title: "Layanan & Pengaduan",
        href: "/admin/layanan",
        icon: MessageSquare,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex bg-slate-900 text-white h-screen w-64 flex-col fixed left-0 top-0 z-50">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold tracking-wider">
                    KARANGLO <span className="text-emerald-500">ADMIN</span>
                </h1>
                <p className="text-xs text-slate-400 mt-1">Content Management System</p>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-emerald-600 text-white"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <form action={logout}>
                    <Button variant="destructive" className="w-full flex items-center gap-2 justify-center">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </form>
            </div>
        </div>
    );
}
