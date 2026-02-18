"use client";

import { useActionState } from "react";
import { updateProfile } from "@/actions/admin-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { ImageUpload } from "@/components/ui/image-upload";
import { useState } from "react";

interface ProfileGeneralFormProps {
    profile: any;
}

const initialState = {
    message: "",
};

export function ProfileGeneralForm({ profile }: ProfileGeneralFormProps) {
    const [state, formAction, isPending] = useActionState(updateProfile, initialState);
    const [headerBgProfil, setHeaderBgProfil] = useState(profile.headerBgProfil || "");

    return (
        <form action={formAction}>
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Umum Desa</CardTitle>
                    <CardDescription>
                        Data utama identitas desa.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {state?.message && (
                        <Alert variant={state.message.includes("Gagal") ? "destructive" : "default"}>
                            <AlertDescription>{state.message}</AlertDescription>
                        </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Desa</Label>
                            <Input id="name" name="name" defaultValue={profile.name} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Resmi</Label>
                            <Input id="email" name="email" type="email" defaultValue={profile.email || ""} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telepon / WhatsApp</Label>
                            <Input id="phone" name="phone" defaultValue={profile.phone} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Alamat Kantor Desa</Label>
                            <Input id="address" name="address" defaultValue={profile.address} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Deskripsi Singkat</Label>
                        <Textarea id="description" name="description" rows={3} defaultValue={profile.description} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="history">Sejarah Desa</Label>
                        <Textarea id="history" name="history" rows={5} defaultValue={profile.history} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="vision">Visi</Label>
                            <Textarea id="vision" name="vision" rows={4} defaultValue={profile.vision} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mission">Misi</Label>
                            <Textarea id="mission" name="mission" rows={4} defaultValue={profile.mission} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mapEmbedUrl">URL Embed Google Maps</Label>
                        <Input id="mapEmbedUrl" name="mapEmbedUrl" defaultValue={profile.mapEmbedUrl || ""} placeholder="https://www.google.com/maps/embed?..." />
                        <p className="text-xs text-muted-foreground">Paste link dari fitur 'Embed a map' Google Maps disini.</p>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <Label>Background Halaman Profil</Label>
                        <ImageUpload
                            value={headerBgProfil}
                            onChange={setHeaderBgProfil}
                            onRemove={() => setHeaderBgProfil("")}
                            name="headerBgProfil"
                            label="Pilih Gambar Background Profil"
                            disabled={isPending}
                        />
                        <p className="text-xs text-muted-foreground italic">Muncul di bagian atas halaman Profil Desa.</p>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                "Simpan Perubahan"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
