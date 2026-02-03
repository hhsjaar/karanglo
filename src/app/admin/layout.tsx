import { AdminSidebar, SidebarContent } from "@/components/admin/admin-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Desktop Sidebar (hidden on mobile) */}
            <AdminSidebar />

            <div className="md:pl-64 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="md:hidden sticky top-0 z-40 bg-white dark:bg-slate-900 border-b p-4 flex items-center justify-between">
                    <div className="font-bold text-lg">
                        KARANGLO <span className="text-emerald-500">ADMIN</span>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64 border-r-0 bg-slate-900 text-white">
                            {/* Pass a function to close sheet if needed, but simple link click usually enough with router refresh? 
                               Actually shadcn Sheet usually needs Open state control to close on navigate.
                               For now, let's just render content. UX might require clicking background to close. 
                            */}
                            <SidebarContent />
                        </SheetContent>
                    </Sheet>
                </header>

                <main className="p-4 md:p-8 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
