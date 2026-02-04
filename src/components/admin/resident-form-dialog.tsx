"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createResident, updateResident } from "@/actions/admin-resident"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    nik: z.string().min(16, "NIK harus 16 digit").max(16),
    name: z.string().min(2, "Nama minimal 2 karakter"),
    gender: z.string(),
    birthPlace: z.string().optional(),
    birthDate: z.string(),
    religion: z.string(),
    education: z.string(),
    profession: z.string(),
    maritalStatus: z.string(),
    address: z.string(),
    rt: z.string(),
    rw: z.string(),
})

interface ResidentFormDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    resident?: any
}

export function ResidentFormDialog({ open, onOpenChange, resident }: ResidentFormDialogProps) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: resident ? {
            ...resident,
            birthDate: new Date(resident.birthDate).toISOString().split('T')[0]
        } : {
            nik: "",
            name: "",
            gender: "LAKI-LAKI",
            birthPlace: "",
            birthDate: "",
            religion: "Islam",
            education: "SMA",
            profession: "",
            maritalStatus: "Belum Kawin",
            address: "",
            rt: "",
            rw: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            if (resident) {
                await updateResident(resident.id, values)
                toast.success("Data penduduk berhasil diperbarui")
            } else {
                await createResident(values)
                toast.success("Data penduduk berhasil ditambahkan")
            }
            onOpenChange(false)
            form.reset()
        } catch (error) {
            toast.error("Terjadi kesalahan")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{resident ? "Edit Data Penduduk" : "Tambah Data Penduduk"}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="nik"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>NIK</FormLabel>
                                        <FormControl>
                                            <Input placeholder="16 digit NIK" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Lengkap</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nama sesuai KTP" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jenis Kelamin</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="LAKI-LAKI">Laki-laki</SelectItem>
                                                <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="birthDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tanggal Lahir</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="religion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Agama</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Agama" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Islam">Islam</SelectItem>
                                                <SelectItem value="Kristen">Kristen</SelectItem>
                                                <SelectItem value="Katolik">Katolik</SelectItem>
                                                <SelectItem value="Hindu">Hindu</SelectItem>
                                                <SelectItem value="Budha">Budha</SelectItem>
                                                <SelectItem value="Konghucu">Konghucu</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="maritalStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status Perkawinan</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Belum Kawin">Belum Kawin</SelectItem>
                                                <SelectItem value="Kawin">Kawin</SelectItem>
                                                <SelectItem value="Cerai Hidup">Cerai Hidup</SelectItem>
                                                <SelectItem value="Cerai Mati">Cerai Mati</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="profession"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pekerjaan</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Pekerjaan saat ini" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="education"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pendidikan Terakhir</FormLabel>
                                        <FormControl>
                                            <Input placeholder="SD/SMP/SMA/S1/..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alamat (Dusun/Jalan)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: Dusun I" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="rt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RT</FormLabel>
                                        <FormControl>
                                            <Input placeholder="001" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="rw"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RW</FormLabel>
                                        <FormControl>
                                            <Input placeholder="001" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="pt-4 border-t">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {resident ? "Simpan Perubahan" : "Tambah Data"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
