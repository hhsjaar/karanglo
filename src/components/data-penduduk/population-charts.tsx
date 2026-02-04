"use client"

import { useMemo } from "react"
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Resident {
    id: string
    gender: string
    birthDate: Date
    religion: string
    education: string
    profession: string
    maritalStatus: string
}

interface PopulationChartsProps {
    residents: Resident[]
}

export function PopulationCharts({ residents }: PopulationChartsProps) {
    const genderData = useMemo(() => {
        const male = residents.filter(r => r.gender === "LAKI-LAKI").length
        const female = residents.filter(r => r.gender === "PEREMPUAN").length
        return [
            { name: 'Laki-laki', value: male, color: '#3b82f6' },
            { name: 'Perempuan', value: female, color: '#ec4899' },
        ]
    }, [residents])

    const ageData = useMemo(() => {
        const now = new Date()
        const bins = [
            { name: '0-5', Laki: 0, Perempuan: 0 },
            { name: '6-12', Laki: 0, Perempuan: 0 },
            { name: '13-17', Laki: 0, Perempuan: 0 },
            { name: '18-25', Laki: 0, Perempuan: 0 },
            { name: '26-40', Laki: 0, Perempuan: 0 },
            { name: '41-60', Laki: 0, Perempuan: 0 },
            { name: '60+', Laki: 0, Perempuan: 0 },
        ]

        residents.forEach(r => {
            const birth = new Date(r.birthDate)
            const age = now.getFullYear() - birth.getFullYear()
            const gender = r.gender === "LAKI-LAKI" ? "Laki" : "Perempuan"

            if (age <= 5) bins[0][gender]++
            else if (age <= 12) bins[1][gender]++
            else if (age <= 17) bins[2][gender]++
            else if (age <= 25) bins[3][gender]++
            else if (age <= 40) bins[4][gender]++
            else if (age <= 60) bins[5][gender]++
            else bins[6][gender]++
        })
        return bins
    }, [residents])

    const educationData = useMemo(() => {
        const counts: Record<string, number> = {}
        residents.forEach(r => {
            counts[r.education] = (counts[r.education] || 0) + 1
        })
        return Object.entries(counts).map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
    }, [residents])

    const religionData = useMemo(() => {
        const counts: Record<string, number> = {}
        const colors: Record<string, string> = {
            'Islam': '#10b981',
            'Kristen': '#3b82f6',
            'Katolik': '#6366f1',
            'Hindu': '#f59e0b',
            'Budha': '#eb5757',
            'Konghucu': '#828282'
        }
        residents.forEach(r => {
            counts[r.religion] = (counts[r.religion] || 0) + 1
        })
        return Object.entries(counts).map(([name, value]) => ({
            name,
            value,
            color: colors[name] || '#94a3b8'
        }))
    }, [residents])

    const professionData = useMemo(() => {
        const counts: Record<string, number> = {}
        residents.forEach(r => {
            counts[r.profession] = (counts[r.profession] || 0) + 1
        })
        return Object.entries(counts).map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 8) // Limit to top 8
    }, [residents])

    const maritalData = useMemo(() => {
        const counts: Record<string, number> = {}
        const colors: Record<string, string> = {
            'Belum Kawin': '#94a3b8',
            'Kawin': '#f43f5e',
            'Cerai Hidup': '#f97316',
            'Cerai Mati': '#78716c'
        }
        residents.forEach(r => {
            counts[r.maritalStatus] = (counts[r.maritalStatus] || 0) + 1
        })
        return Object.entries(counts).map(([name, value]) => ({
            name,
            value,
            color: colors[name] || '#cbd5e1'
        }))
    }, [residents])

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-lg">Jenis Kelamin</CardTitle>
                        <CardDescription>Perbandingan jumlah Laki-laki dan Perempuan</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={genderData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {genderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value} Orang`} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-lg">Agama</CardTitle>
                        <CardDescription>Distribusi berdasarkan agama</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={religionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {religionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value} Orang`} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm border-slate-200">
                <CardHeader>
                    <CardTitle className="text-lg">Struktur Usia</CardTitle>
                    <CardDescription>Berdasarkan kelompok umur</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ageData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: '#f1f5f9' }} />
                            <Legend />
                            <Bar dataKey="Laki" stackId="a" fill="#3b82f6" name="Laki-laki" radius={[0, 0, 4, 4]} />
                            <Bar dataKey="Perempuan" stackId="a" fill="#ec4899" name="Perempuan" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-lg">Pendidikan</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={educationData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" width={120} style={{ fontSize: '11px' }} axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" name="Jiwa" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-lg">Pekerjaan</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={professionData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" style={{ fontSize: '10px' }} interval={0} angle={-30} textAnchor="end" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#f59e0b" name="Jiwa" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm border-slate-200">
                <CardHeader>
                    <CardTitle className="text-lg">Status Perkawinan</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={maritalData}
                                cx="50%"
                                cy="50%"
                                innerRadius={0}
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {maritalData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend layout="vertical" verticalAlign="middle" align="right" />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
