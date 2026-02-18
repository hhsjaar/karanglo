"use client";

import { useActionState, useState } from "react";
import { updateProfile } from "@/actions/admin-profile";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Image as ImageIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ImageUpload } from "@/components/ui/image-upload";

interface PotencyHeaderSettingsProps {
    profile: any;
}

const initialState = {
    message: "",
};

export function PotencyHeaderSettings({ profile }: PotencyHeaderSettingsProps) {
    const [state, formAction, isPending] = useActionState(updateProfile, initialState);
    const [headerBgPotensi, setHeaderBgPotensi] = useState(profile.headerBgPotensi || "");

    return (
        <Card className="mb-8 overflow-hidden border-emerald-100 dark:border-emerald-900 shadow-emerald-500/5">
            <CardHeader className="bg-emerald-50/50 dark:bg-emerald-900/20 pb-4">
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <ImageIcon className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Pengaturan Visual</span>
                </div>
                <CardTitle className="text-xl">Background Halaman Potensi</CardTitle>
                <CardDescription>
                    Sesuaikan gambar yang muncul di header halaman Potensi Desa.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <form action={formAction} className="space-y-6">
                    {state?.message && (
                        <Alert
                            variant={state.message.includes("Gagal") ? "destructive" : "default"}
                            className={state.message.includes("berhasil") ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-400" : ""}
                        >
                            <AlertDescription>{state.message}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-4">
                        <ImageUpload
                            value={headerBgPotensi}
                            onChange={setHeaderBgPotensi}
                            onRemove={() => setHeaderBgPotensi("")}
                            name="headerBgPotensi"
                            label="Pilih Gambar Background"
                            disabled={isPending}
                        />
                        <p className="text-xs text-muted-foreground italic">
                            Rekomendasi: Gambar landscape dengan resolusi tinggi (min. 1920x1080px).
                        </p>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button type="submit" disabled={isPending} className="bg-emerald-600 hover:bg-emerald-700">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Simpan Perubahan
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
