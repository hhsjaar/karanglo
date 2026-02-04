"use client"

import { useState, useTransition } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Search,
    Plus,
    Pencil,
    Trash2,
} from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { ResidentFormDialog } from "./resident-form-dialog"
import { deleteResident } from "@/actions/admin-resident"
import { toast } from "sonner"

interface Resident {
    id: string
    nik: string
    name: string
    gender: string
    birthDate: Date
    profession: string
    address: string
    rt: string
    rw: string
    religion: string
    education: string
    maritalStatus: string
    birthPlace?: string | null
}

interface ResidentListProps {
    residents: Resident[]
}

export function ResidentList({ residents }: ResidentListProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedResident, setSelectedResident] = useState<Resident | null>(null)
    const [isPending, startTransition] = useTransition()

    const filteredResidents = residents.filter(resident =>
        resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.nik.includes(searchTerm)
    )

    const handleAdd = () => {
        setSelectedResident(null)
        setIsDialogOpen(true)
    }

    const handleEdit = (resident: Resident) => {
        setSelectedResident(resident)
        setIsDialogOpen(true)
    }

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus data penduduk ini?")) {
            startTransition(async () => {
                const result = await deleteResident(id)
                if (result.success) {
                    toast.success("Data penduduk berhasil dihapus")
                } else {
                    toast.error(result.error || "Gagal menghapus data")
                }
            })
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari nama atau NIK..."
                        className="pl-10 text-slate-800"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button className="gap-2 flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700" onClick={handleAdd}>
                        <Plus className="h-4 w-4" />
                        Tambah Penduduk
                    </Button>
                </div>
            </div>

            <div className="border rounded-lg bg-white overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[150px]">NIK</TableHead>
                            <TableHead>Nama Lengkap</TableHead>
                            <TableHead>L/P</TableHead>
                            <TableHead>Tgl Lahir</TableHead>
                            <TableHead>Pekerjaan</TableHead>
                            <TableHead>Alamat</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredResidents.length > 0 ? (
                            filteredResidents.map((resident) => (
                                <TableRow key={resident.id}>
                                    <TableCell className="font-medium font-mono text-xs">{resident.nik}</TableCell>
                                    <TableCell className="font-medium">{resident.name}</TableCell>
                                    <TableCell>{resident.gender === "LAKI-LAKI" ? "L" : "P"}</TableCell>
                                    <TableCell>{format(new Date(resident.birthDate), "dd MMM yyyy", { locale: id })}</TableCell>
                                    <TableCell>{resident.profession}</TableCell>
                                    <TableCell className="text-sm">
                                        {resident.address}, RT {resident.rt}/RW {resident.rw}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" onClick={() => handleEdit(resident)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-600"
                                                onClick={() => handleDelete(resident.id)}
                                                disabled={isPending}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                    Data tidak ditemukan.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="text-xs text-muted-foreground">
                Menampilkan {filteredResidents.length} dari {residents.length} data penduduk.
            </div>

            <ResidentFormDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                resident={selectedResident}
            />
        </div>
    )
}
