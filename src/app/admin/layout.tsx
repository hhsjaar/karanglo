import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <div className="pl-64">
                {/* Header could go here */}
                <header className="h-16 border-b bg-white dark:bg-slate-900 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
                    <h2 className="font-semibold text-lg">Panel Administrasi</h2>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">
                            Selamat datang, <span className="font-medium text-foreground">Admin</span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                            A
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
