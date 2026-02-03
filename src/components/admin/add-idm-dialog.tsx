"use client";

import { createIdmRecord } from "@/actions/admin-idm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Plus } from "lucide-react";

export function AddIdmDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Tambah Data IDM
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Update Status IDM</DialogTitle>
                </DialogHeader>
                <form action={async (formData) => {
                    await createIdmRecord(null, formData);
                    setOpen(false);
                }} className="space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Tahun</Label>
                            <Input name="year" type="number" defaultValue={new Date().getFullYear()} required />
                        </div>
                        <div className="space-y-2">
                            <Label>Status Desa</Label>
                            <Select name="status" defaultValue="MAJU" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MANDIRI">MANDIRI</SelectItem>
                                    <SelectItem value="MAJU">MAJU</SelectItem>
                                    <SelectItem value="BERKEMBANG">BERKEMBANG</SelectItem>
                                    <SelectItem value="TERTINGGAL">TERTINGGAL</SelectItem>
                                    <SelectItem value="SANGAT_TERTINGGAL">SANGAT TERTINGGAL</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Skor IKS</Label>
                            <Input name="scoreIks" type="number" step="0.0001" placeholder="0.0000" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Skor IKE</Label>
                            <Input name="scoreIke" type="number" step="0.0001" placeholder="0.0000" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Skor IKL</Label>
                            <Input name="scoreIkl" type="number" step="0.0001" placeholder="0.0000" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Skor Total</Label>
                            <Input name="scoreTotal" type="number" step="0.0001" placeholder="0.0000" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Rekomendasi</Label>
                        <Textarea name="recommendations" placeholder="Catatan rekomendasi..." />
                    </div>

                    <DialogFooter>
                        <Button type="submit">Simpan Data</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
