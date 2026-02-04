"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Resident {
    id: string
    nik: string
    name: string
    gender: string
    profession: string
    address: string
    rt: string
    rw: string
}

interface PublicResidentListProps {
    residents: Resident[]
}

export function PublicResidentList({ residents }: PublicResidentListProps) {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredResidents = residents.filter(resident =>
        resident.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Mask NIK for public view
    const maskNIK = (nik: string) => {
        return nik.substring(0, 6) + "**********"
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Daftar Penduduk</h2>
                    <p className="text-slate-500 text-sm">Pencarian data penduduk Desa Karanglo.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari nama penduduk..."
                        className="pl-10 bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50 dark:bg-slate-900">
                            <TableRow>
                                <TableHead className="w-[180px]">NIK (Tersamar)</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>L/P</TableHead>
                                <TableHead>Pekerjaan</TableHead>
                                <TableHead>Alamat</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredResidents.length > 0 ? (
                                filteredResidents.map((resident) => (
                                    <TableRow key={resident.id}>
                                        <TableCell className="font-mono text-xs text-muted-foreground">
                                            {maskNIK(resident.nik)}
                                        </TableCell>
                                        <TableCell className="font-medium text-slate-700 dark:text-slate-300">
                                            {resident.name}
                                        </TableCell>
                                        <TableCell>{resident.gender === "LAKI-LAKI" ? "L" : "P"}</TableCell>
                                        <TableCell>{resident.profession}</TableCell>
                                        <TableCell className="text-sm text-slate-500">
                                            {resident.address}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                        Data penduduk tidak ditemukan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
