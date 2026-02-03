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
import { createActivity, updateActivity } from "@/actions/admin-activity";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { ImageUpload } from "@/components/ui/image-upload";

interface ActivityFormProps {
    activity?: any;
    isEdit?: boolean;
}

const initialState = {
    message: "",
};

export function ActivityForm({ activity, isEdit = false }: ActivityFormProps) {
    const action = isEdit ? updateActivity.bind(null, activity.id) : createActivity;
    const [state, formAction, isPending] = useActionState(action, initialState);

    // Live Preview State
    const [previewData, setPreviewData] = useState(activity || {
        title: "Judul Berita",
        category: "NEWS",
        thumbnail: "/placeholder.svg",
        content: "Konten berita...",
        publishedAt: new Date().toISOString(),
        author: "Admin"
    });

    const handlePreviewChange = (field: string, value: string) => {
        setPreviewData((prev: any) => ({ ...prev, [field]: value }));
    };

    return (
        <form action={formAction} className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <Button variant="ghost" asChild className="pl-0">
                        <Link href="/admin/kegiatan">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">{isEdit ? "Edit Berita" : "Tambah Berita"}</h1>
                </div>

                <Card>
                    <CardContent className="space-y-4 pt-6">
                        <div className="space-y-2">
                            <Label>Judul Berita / Kegiatan</Label>
                            <Input
                                name="title"
                                defaultValue={activity?.title}
                                onChange={(e) => handlePreviewChange("title", e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Slug (URL)</Label>
                                <Input name="slug" defaultValue={activity?.slug} required placeholder="contoh: musyawarah-desa-2024" />
                            </div>
                            <div className="space-y-2">
                                <Label>Kategori</Label>
                                <Select name="category" defaultValue={activity?.category || "NEWS"} onValueChange={(v) => handlePreviewChange("category", v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="NEWS">Berita</SelectItem>
                                        <SelectItem value="EVENT">Agenda / Event</SelectItem>
                                        <SelectItem value="ANNOUNCEMENT">Pengumuman</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Ringkasan (Excerpt)</Label>
                            <Textarea name="excerpt" defaultValue={activity?.excerpt} rows={3} placeholder="Satu paragraf singkat..." />
                        </div>

                        <div className="space-y-2">
                            <Label>Konten Lengkap</Label>
                            <Textarea
                                name="content"
                                defaultValue={activity?.content}
                                rows={10}
                                className="font-mono text-sm"
                                onChange={(e) => handlePreviewChange("content", e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Thumbnail Berita</Label>
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
                                <Label>Penulis</Label>
                                <Input name="author" defaultValue={activity?.author || "Admin"} onChange={(e) => handlePreviewChange("author", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Tanggal Publish</Label>
                                <Input
                                    type="date"
                                    name="publishedAt"
                                    defaultValue={activity?.publishedAt ? new Date(activity.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                                    onChange={(e) => handlePreviewChange("publishedAt", e.target.value)}
                                />
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
                            Simpan & Publish
                        </Button>

                        {/* PREVIEW SHEET */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="w-full">
                                    <Eye className="mr-2 h-4 w-4" />
                                    Preview Berita
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="w-[400px] sm:w-[600px] overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>Preview Tampilan</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 pb-8">
                                    <div className="text-sm text-muted-foreground mb-4">
                                        {format(new Date(previewData.publishedAt), "dd MMMM yyyy", { locale: idLocale })} • Oleh {previewData.author}
                                    </div>
                                    <h2 className="text-2xl font-bold mb-6">{previewData.title}</h2>
                                    <div className="relative h-64 w-full bg-slate-100 rounded-lg overflow-hidden mb-6">
                                        <Image
                                            src={previewData.thumbnail || "/placeholder.svg"}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="prose prose-sm max-w-none text-slate-700">
                                        {previewData.content}
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
