import { getIdmRecords, deleteIdmRecord } from "@/actions/admin-idm";
import { AddIdmDialog } from "@/components/admin/add-idm-dialog";
import { DeleteButton } from "@/components/admin/delete-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function AdminIdmPage() {
    const records = await getIdmRecords();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Status IDM</h1>
                    <p className="text-muted-foreground">Indeks Desa Membangun (Key Performance Indicator).</p>
                </div>
                <AddIdmDialog />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Riwayat Skor IDM</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tahun</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>IKS</TableHead>
                                <TableHead>IKE</TableHead>
                                <TableHead>IKL</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead className="w-[100px] text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {records.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-bold">{item.year}</TableCell>
                                    <TableCell>
                                        <Badge variant={item.status === 'MANDIRI' ? 'default' : 'secondary'}>
                                            {item.status.replace("_", " ")}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{item.scoreIks}</TableCell>
                                    <TableCell>{item.scoreIke}</TableCell>
                                    <TableCell>{item.scoreIkl}</TableCell>
                                    <TableCell className="font-bold">{item.scoreTotal}</TableCell>
                                    <TableCell className="text-right">
                                        <DeleteButton action={deleteIdmRecord.bind(null, item.id)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
