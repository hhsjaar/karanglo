"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Ensure this matches installed component
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createBanner, updateBanner } from "@/actions/admin-banner";
import { ImageUpload } from "@/components/ui/image-upload";
import { useState } from "react";

interface BannerFormProps {
    banner?: any; // Type strictly if possible, for now 'any' works
    isEdit?: boolean;
}

const initialState = {
    message: "",
};

export function BannerForm({ banner, isEdit = false }: BannerFormProps) {
    // Bind the correct action (create or update)
    const action = isEdit
        ? updateBanner.bind(null, banner?.id)
        : createBanner;

    const [state, formAction, isPending] = useActionState(action, initialState);
    const [imageUrl, setImageUrl] = useState(banner?.image || "");

    return (
        <form action={formAction} className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-2 pl-0 hover:bg-transparent hover:text-primary">
                    <Link href="/admin/banners">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold">{isEdit ? "Edit Banner" : "Tambah Banner Baru"}</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Informasi Banner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {state?.message && (
                        <Alert variant="destructive">
                            <AlertDescription>{state.message}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="title">Judul Utama</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Contoh: Selamat Datang di Desa Karanglo"
                            defaultValue={banner?.title}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Deskripsi singkat yang muncul di bawah judul..."
                            defaultValue={banner?.description || ""}
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Gambar Banner</Label>
                        <ImageUpload
                            value={imageUrl}
                            onChange={(url) => setImageUrl(url)}
                            onRemove={() => setImageUrl("")}
                            disabled={isPending}
                        />
                        <input type="hidden" name="image" value={imageUrl} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="link">Link Tujuan (Opsional)</Label>
                        <Input
                            id="link"
                            name="link"
                            placeholder="Contoh: /profil"
                            defaultValue={banner?.link || ""}
                        />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <Switch
                            id="isActive"
                            name="isActive"
                            defaultChecked={banner?.isActive ?? true}
                        />
                        <Label htmlFor="isActive">Aktifkan Banner Ini</Label>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" asChild disabled={isPending}>
                        <Link href="/admin/banners">Batal</Link>
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            "Simpan Banner"
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
