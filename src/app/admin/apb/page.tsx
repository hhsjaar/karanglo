import { getBudgets, deleteBudget } from "@/actions/admin-budget";
import { AddBudgetDialog } from "@/components/admin/add-budget-dialog";
import { DeleteButton } from "@/components/admin/delete-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function AdminApbPage() {
    const budgets = await getBudgets(2024); // Default to current year logic later

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">APB Desa</h1>
                    <p className="text-muted-foreground">Kelola anggaran pendapatan dan belanja desa.</p>
                </div>
                <AddBudgetDialog />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Data Anggaran Tahun 2024</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Jenis</TableHead>
                                <TableHead>Uraian</TableHead>
                                <TableHead className="text-right">Jumlah</TableHead>
                                <TableHead className="w-[100px] text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {budgets.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Badge variant={item.type === 'INCOME' ? 'default' : (item.type === 'EXPENSE' ? 'destructive' : 'secondary')}>
                                            {item.type === 'INCOME' ? 'Pendapatan' : (item.type === 'EXPENSE' ? 'Belanja' : 'Pembiayaan')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{item.category}</TableCell>
                                    <TableCell className="text-right font-mono">
                                        {formatCurrency(item.amount)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DeleteButton action={deleteBudget.bind(null, item.id)} />
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
