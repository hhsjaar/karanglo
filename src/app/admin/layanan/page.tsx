import { getComplaints } from "@/actions/admin-complaint";
import { RespondComplaintDialog } from "@/components/admin/respond-complaint-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function AdminLayananPage() {
    const complaints = await getComplaints();

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING": return "destructive"; // Red attention
            case "PROCESSING": return "secondary"; // Yellow/Greyish
            case "RESOLVED": return "default"; // Green/Primary
            default: return "outline";
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Layanan & Pengaduan</h1>
                <p className="text-muted-foreground">Monitoring aspirasi dan pengaduan masyarakat.</p>
            </div>

            <div className="border rounded-lg bg-white dark:bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Tiket</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Judul</TableHead>
                            <TableHead>Pelapor</TableHead>
                            <TableHead className="w-[150px] text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {complaints.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    Belum ada pengaduan masuk.
                                </TableCell>
                            </TableRow>
                        ) : (
                            complaints.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-mono font-bold text-xs">{item.ticketId}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusColor(item.status) as any}>
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium max-w-[300px] truncate">{item.title}</TableCell>
                                    <TableCell className="text-sm">
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-xs text-muted-foreground">{item.phone}</div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <RespondComplaintDialog complaint={item} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
