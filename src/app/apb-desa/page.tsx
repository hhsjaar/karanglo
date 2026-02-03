import { ApbDashboard } from "@/components/apb/apb-dashboard"
import { FileText } from "lucide-react"
import { getBudgets } from "@/actions/admin-budget"

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "APB Desa | Desa Karanglo",
    description: "Transparansi Anggaran Pendapatan dan Belanja Desa Karanglo.",
}

export default async function ApbPage() {
    const budgets = await getBudgets();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
            <div className="bg-emerald-600 py-16 mb-12 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Transparansi Anggaran</h1>
                    <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                        Wujud komitmen pemerintah desa dalam pengelolaan keuangan yang transparan, akuntabel, dan partisipatif.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="bg-white dark:bg-card p-6 md:p-8 rounded-xl shadow-sm border mb-8">
                    <ApbDashboard budgets={budgets} />
                </div>

                {/* Infographic Area / Mind Map placeholder */}
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-8 text-center border-2 border-dashed border-slate-300 dark:border-slate-700">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Diagram Alur & Infografis APB Desa</h3>
                    <p className="text-muted-foreground">Infografis baliho APB Desa tersedia untuk diunduh.</p>
                </div>
            </div>
        </div>
    )
}
