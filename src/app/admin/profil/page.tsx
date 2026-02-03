import { getVillageProfile } from "@/actions/admin-profile";
import { ProfileGeneralForm } from "@/components/admin/profile-general-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = 'force-dynamic';

export default async function AdminProfilePage() {
    const profile = await getVillageProfile();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Profil Desa</h1>
                <p className="text-muted-foreground">Kelola identitas, sejarah, visi misi, dan perangkat desa.</p>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">Informasi Umum</TabsTrigger>
                    <TabsTrigger value="officials">Perangkat Desa</TabsTrigger>
                    <TabsTrigger value="institutions">Lembaga Desa</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <ProfileGeneralForm profile={profile} />
                </TabsContent>

                <TabsContent value="officials">
                    <Card>
                        <CardHeader><CardTitle>Perangkat Desa</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Fitur manajemen perangkat desa akan segera hadir.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="institutions">
                    <Card>
                        <CardHeader><CardTitle>Lembaga Desa</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Fitur manajemen lembaga desa akan segera hadir.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
