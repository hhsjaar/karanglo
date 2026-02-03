"use client"

import { useMemo } from "react"
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    AreaChart, Area
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// MOCK DATA (Simulating DB/API)
const GENDER_DATA = [
    { name: 'Laki-laki', value: 1750, color: '#3b82f6' }, // blue-500
    { name: 'Perempuan', value: 1820, color: '#ec4899' }, // pink-500
]

const AGE_DATA = [
    { name: '0-5', Laki: 150, Perempuan: 140 },
    { name: '6-12', Laki: 200, Perempuan: 190 },
    { name: '13-17', Laki: 180, Perempuan: 170 },
    { name: '18-25', Laki: 300, Perempuan: 320 },
    { name: '26-40', Laki: 450, Perempuan: 460 },
    { name: '41-60', Laki: 350, Perempuan: 380 },
    { name: '60+', Laki: 120, Perempuan: 160 },
]

const EDUCATION_DATA = [
    { name: 'Tidak/Belum Sekolah', value: 450 },
    { name: 'SD/Sederajat', value: 1200 },
    { name: 'SMP/Sederajat', value: 900 },
    { name: 'SMA/Sederajat', value: 750 },
    { name: 'Diploma/Sarjana', value: 270 },
]

const RELIGION_DATA = [
    { name: 'Islam', value: 3400, color: '#10b981' },
    { name: 'Kristen', value: 120, color: '#6366f1' },
    { name: 'Katolik', value: 50, color: '#8b5cf6' },
    { name: 'Hindu', value: 10, color: '#f59e0b' },
]

const PROFESSION_DATA = [
    { name: 'Petani', value: 1200 },
    { name: 'Buruh Tani', value: 800 },
    { name: 'Wiraswasta', value: 500 },
    { name: 'PNS/TNI/Polri', value: 150 },
    { name: 'Pelajar/Mhs', value: 600 },
    { name: 'Lainnya', value: 320 },
]

const MARITAL_DATA = [
    { name: 'Belum Kawin', value: 1400, color: '#94a3b8' },
    { name: 'Kawin', value: 2000, color: '#f43f5e' },
    { name: 'Cerai Hidup', value: 100, color: '#f97316' },
    { name: 'Cerai Mati', value: 70, color: '#78716c' },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function PopulationCharts() {
    return (
        <div className="space-y-8">
            {/* Top Row: Gender & Religion (Pie Charts) */}
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Berdasarkan Jenis Kelamin</CardTitle>
                        <CardDescription>Perbandingan jumlah penduduk laki-laki dan perempuan</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={GENDER_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {GENDER_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value} Jiwa`} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Berdasarkan Agama</CardTitle>
                        <CardDescription>Distribusi penduduk berdasarkan agama kepercayaan</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={RELIGION_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {RELIGION_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value} Jiwa`} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Middle: Age Structure (Pyramid-ish Bar Chart) */}
            <Card>
                <CardHeader>
                    <CardTitle>Struktur Usia Penduduk</CardTitle>
                    <CardDescription>Sebaran penduduk berdasarkan kelompok usia produktif dan non-produktif</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={AGE_DATA}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Legend />
                            <Bar dataKey="Laki" stackId="a" fill="#3b82f6" name="Laki-laki" radius={[0, 0, 4, 4]} />
                            <Bar dataKey="Perempuan" stackId="a" fill="#ec4899" name="Perempuan" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Bottom Row: Education & Profession (Bar Charts) */}
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Tingkat Pendidikan</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                layout="vertical"
                                data={EDUCATION_DATA}
                                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" width={100} style={{ fontSize: '12px' }} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" name="Jumlah" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Mata Pencaharian</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={PROFESSION_DATA}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" style={{ fontSize: '11px' }} interval={0} />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#f59e0b" name="Jumlah" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Last: Marital Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Status Perkawinan</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={MARITAL_DATA}
                                cx="50%"
                                cy="50%"
                                innerRadius={0}
                                outerRadius={80}
                                dataKey="value"
                                label
                            >
                                {MARITAL_DATA.map((entry, index) => (
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
