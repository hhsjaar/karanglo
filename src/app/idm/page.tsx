import { IdmDashboard } from "@/components/idm/idm-dashboard"

export const metadata = {
    title: "IDM (Indeks Desa Membangun) | Desa Karanglo",
    description: "Data status kemajuan dan kemandirian Desa Karanglo (IDM).",
}

export default function IdmPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12">
            <div className="bg-slate-900 py-16 mb-12 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Indeks Desa Membangun (IDM)</h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Alat ukur perkembangan kemandirian Desa Karanglo menuju status Desa Mandiri.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="bg-white dark:bg-card p-6 md:p-8 rounded-xl shadow-sm border mb-8">
                    <IdmDashboard />
                </div>
            </div>
        </div>
    )
}
