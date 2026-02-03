import { getDemographics } from "@/actions/admin-demographic";
import { DemographicManager } from "@/components/admin/demographic-manager";

export const dynamic = 'force-dynamic';

export default async function AdminPendudukPage() {
    const stats = await getDemographics();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Data Penduduk</h1>
                <p className="text-muted-foreground">Kelola statistik kependudukan desa.</p>
            </div>

            <DemographicManager stats={stats} />
        </div>
    );
}
