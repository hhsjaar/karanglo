"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface ApbDashboardProps {
    budgets: any[]; // Using any to avoid strict Prisma type coupling in component for now
}

const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
}

export function ApbDashboard({ budgets = [] }: ApbDashboardProps) {
    const [selectedYear, setSelectedYear] = useState<string>("");

    // Process data: Group dynamically by year
    const dataByYear = budgets.reduce((acc, budget) => {
        const year = budget.year.toString();
        if (!acc[year]) {
            acc[year] = { income: [], expense: [], financing: [] };
        }

        const item = {
            name: budget.category,
            amount: Number(budget.amount), // Ensure number
            color: budget.type === 'INCOME' ? "#10b981" : budget.type === 'EXPENSE' ? "#ef4444" : "#3b82f6" // Simple coloring logic
        };

        if (budget.type === 'INCOME') acc[year].income.push(item);
        if (budget.type === 'EXPENSE') acc[year].expense.push(item);
        if (budget.type === 'FINANCING') acc[year].financing.push(item);

        return acc;
    }, {} as Record<string, { income: any[], expense: any[], financing: any[] }>);

    // Get available years sorted descending
    const availableYears = Object.keys(dataByYear).sort((a, b) => Number(b) - Number(a));

    // Set default year if not set and data exists
    const currentYear = selectedYear || availableYears[0] || new Date().getFullYear().toString();

    // Get data for selected year or empty fallback
    const data = dataByYear[currentYear] || { income: [], expense: [], financing: [] };

    const totalIncome = data.income.reduce((acc: number, curr: any) => acc + curr.amount, 0);
    const totalExpense = data.expense.reduce((acc: number, curr: any) => acc + curr.amount, 0);
    const totalFinancing = data.financing?.reduce((acc: number, curr: any) => acc + curr.amount, 0) || 0;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Realisasi APB Desa TA {currentYear}</h2>
                <Select value={currentYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableYears.length > 0 ? (
                            availableYears.map(year => (
                                <SelectItem key={year} value={year}>Tahun {year}</SelectItem>
                            ))
                        ) : (
                            <SelectItem value={new Date().getFullYear().toString()}>Tidak ada data</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>

            {/* Summary Big Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-emerald-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Pendapatan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl md:text-3xl font-bold text-emerald-600">{formatRupiah(totalIncome)}</div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Belanja</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl md:text-3xl font-bold text-red-600">{formatRupiah(totalExpense)}</div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Pembiayaan Netto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl md:text-3xl font-bold text-blue-600">{formatRupiah(totalFinancing)}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Detail Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Income Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Rincian Pendapatan</CardTitle>
                        <CardDescription>Sumber dana masuk ke kas desa</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.income} layout="vertical" margin={{ left: 40, right: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" width={100} style={{ fontSize: '12px' }} />
                                <Tooltip formatter={(value: number) => formatRupiah(value)} />
                                <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                                    {data.income.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Expense Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Rincian Belanja</CardTitle>
                        <CardDescription>Alokasi penggunaan dana desa</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.expense} layout="vertical" margin={{ left: 40, right: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" width={150} style={{ fontSize: '11px' }} />
                                <Tooltip formatter={(value: number) => formatRupiah(value)} />
                                <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                                    {data.expense.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
