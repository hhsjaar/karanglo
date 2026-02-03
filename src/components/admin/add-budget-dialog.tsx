"use client";

import { createBudget } from "@/actions/admin-budget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Plus } from "lucide-react";

export function AddBudgetDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Tambah Item Anggaran
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tambah Data APB</DialogTitle>
                </DialogHeader>
                <form action={async (formData) => {
                    await createBudget(null, formData);
                    setOpen(false);
                }} className="space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Tahun Anggaran</Label>
                            <Input name="year" type="number" defaultValue={2024} required />
                        </div>
                        <div className="space-y-2">
                            <Label>Jenis</Label>
                            <Select name="type" defaultValue="INCOME" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Jenis" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="INCOME">Pendapatan</SelectItem>
                                    <SelectItem value="EXPENSE">Belanja</SelectItem>
                                    <SelectItem value="FINANCING">Pembiayaan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Uraian / Kategori</Label>
                        <Input name="category" placeholder="Contoh: Dana Desa" required />
                    </div>

                    <div className="space-y-2">
                        <Label>Jumlah (Rp)</Label>
                        <Input name="amount" type="number" placeholder="0" required />
                    </div>

                    <div className="space-y-2">
                        <Label>Keterangan (Opsional)</Label>
                        <Input name="description" placeholder="Catatan tambahan" />
                    </div>

                    <DialogFooter>
                        <Button type="submit">Simpan</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
