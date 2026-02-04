import { getDemographics } from "@/actions/admin-demographic";
import { getResidents } from "@/actions/admin-resident";
import { DemographicManager } from "@/components/admin/demographic-manager";
import { ResidentList } from "@/components/admin/resident-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const dynamic = 'force-dynamic';

export default async function AdminPendudukPage() {
    const stats = await getDemographics();
    const residents = await getResidents();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Data Penduduk</h1>
                    <p className="text-muted-foreground">Kelola data dan statistik kependudukan desa.</p>
                </div>
            </div>

            <Tabs defaultValue="list" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="list">Daftar Penduduk</TabsTrigger>
                    <TabsTrigger value="stats">Statistik & Grafik</TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="space-y-4">
                    <ResidentList residents={residents} />
                </TabsContent>

                <TabsContent value="stats" className="space-y-4">
                    <DemographicManager stats={stats} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
