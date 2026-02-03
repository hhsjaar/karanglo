"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Eye, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createPotency, updatePotency } from "@/actions/admin-potency";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { ImageUpload } from "@/components/ui/image-upload";

interface PotencyFormProps {
    potency?: any;
    isEdit?: boolean;
}

const initialState = {
    message: "",
};

export function PotencyForm({ potency, isEdit = false }: PotencyFormProps) {
    const action = isEdit ? updatePotency.bind(null, potency.id) : createPotency;
    const [state, formAction, isPending] = useActionState(action, initialState);

    // Live Preview State (basic implementation)
    const [previewData, setPreviewData] = useState(potency || {
        title: "Judul Potensi",
        category: "POTENCY",
        thumbnail: "/placeholder.svg",
        content: "Konten akan muncul di sini..."
    });

    const handlePreviewChange = (field: string, value: string) => {
        setPreviewData((prev: any) => ({ ...prev, [field]: value }));
    };

    return (
        <form action={formAction} className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <Button variant="ghost" asChild className="pl-0">
                        <Link href="/admin/potensi">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">{isEdit ? "Edit Potensi" : "Tambah Potensi"}</h1>
                </div>

                <Card>
                    <CardContent className="space-y-4 pt-6">
                        <div className="space-y-2">
                            <Label>Judul</Label>
                            <Input
                                name="title"
                                defaultValue={potency?.title}
                                onChange={(e) => handlePreviewChange("title", e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Slug (URL)</Label>
                                <Input name="slug" defaultValue={potency?.slug} required placeholder="contoh: wisata-air-umbul" />
                            </div>
                            <div className="space-y-2">
                                <Label>Kategori</Label>
                                <Select name="category" defaultValue={potency?.category || "POTENCY"} onValueChange={(v) => handlePreviewChange("category", v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="POTENCY">Wisata / Potensi</SelectItem>
                                        <SelectItem value="UMKM">UMKM</SelectItem>
                                        <SelectItem value="KKN_PROGRAM">Program KKN</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Deskripsi Singkat</Label>
                            <Textarea name="description" defaultValue={potency?.description} rows={2} />
                        </div>

                        <div className="space-y-2">
                            <Label>Konten Lengkap</Label>
                            <Textarea
                                name="content"
                                defaultValue={potency?.content}
                                rows={10}
                                className="font-mono text-sm"
                                onChange={(e) => handlePreviewChange("content", e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Mendukung format Markdown sederhana.</p>
                        </div>

                        <div className="space-y-2">
                            <Label>Thumbnail Potensi</Label>
                            <ImageUpload
                                value={previewData.thumbnail || ""}
                                onChange={(url) => handlePreviewChange("thumbnail", url)}
                                onRemove={() => handlePreviewChange("thumbnail", "")}
                                disabled={isPending}
                            />
                            <input type="hidden" name="thumbnail" value={previewData.thumbnail || ""} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Nilai Ekonomi (Opsional)</Label>
                                <Input name="economicVal" defaultValue={potency?.economicVal} placeholder="Rp 50jt/th" />
                            </div>
                            <div className="space-y-2">
                                <Label>Lokasi (Opsional)</Label>
                                <Input name="location" defaultValue={potency?.location} placeholder="Dusun I" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="sticky top-24">
                    <CardContent className="pt-6 space-y-4">
                        <Label className="text-lg font-semibold block mb-4">Publikasi</Label>

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Simpan Data
                        </Button>

                        {/* PREVIEW SHEET */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="w-full">
                                    <Eye className="mr-2 h-4 w-4" />
                                    Preview Halaman
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>Preview Tampilan</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 border rounded-lg overflow-hidden pb-8">
                                    <div className="relative h-48 w-full bg-slate-100">
                                        <Image
                                            src={previewData.thumbnail || "/placeholder.svg"}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="text-sm font-semibold text-emerald-600 mb-2 uppercase tracking-wider">
                                            {previewData.category}
                                        </div>
                                        <h2 className="text-2xl font-bold mb-4">{previewData.title}</h2>
                                        <div className="prose prose-sm max-w-none text-slate-600">
                                            {previewData.content}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
}
