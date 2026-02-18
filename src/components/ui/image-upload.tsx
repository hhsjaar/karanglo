"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove: () => void;
    disabled?: boolean;
    label?: string;
    name?: string;
}

export function ImageUpload({
    value,
    onChange,
    onRemove,
    disabled,
    label = "Upload Image",
    name = "image"
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Upload failed");
            }

            const data = await res.json();
            onChange(data.url);
        } catch (error) {
            console.error(error);
            alert(`Gagal mengupload gambar: ${(error as Error).message}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-4 w-full">
            <Label>{label}</Label>
            <div className="flex items-center gap-4">
                {value ? (
                    <div className="relative w-[200px] h-[120px] rounded-md overflow-hidden border bg-slate-100 group">
                        <div className="absolute right-2 top-2 z-10">
                            <Button
                                type="button"
                                onClick={onRemove}
                                variant="destructive"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={value}
                        />
                    </div>
                ) : (
                    <div className="w-[200px] h-[120px] rounded-md border border-dashed flex items-center justify-center bg-slate-50 text-muted-foreground">
                        <ImageIcon className="h-8 w-8 opacity-50" />
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <Button
                        type="button"
                        variant="secondary"
                        disabled={disabled || isUploading}
                        onClick={() => document.getElementById("file-upload")?.click()}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="h-4 w-4 mr-2" />
                                {value ? "Ganti Gambar" : "Pilih Gambar"}
                            </>
                        )}
                    </Button>
                    <Input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onUpload}
                        disabled={disabled || isUploading}
                    />
                    <p className="text-xs text-muted-foreground">
                        Format: JPG, PNG, WEBP. Max 5MB.
                    </p>
                </div>
            </div>
            {/* Hidden Input for Form Submission binding if needed inside a form, 
                but usually we handle state in parent or use specific hidden field */}
            <input type="hidden" name={name} value={value || ""} />
        </div>
    );
}
