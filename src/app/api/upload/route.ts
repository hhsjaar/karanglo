import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const filename = Date.now() + "_" + file.name.replace(/[^a-zA-Z0-9.-]/g, "_");

        const supabase = getSupabase();

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from("uploads")
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error("Supabase Storage Upload Error:", error);
            return NextResponse.json({ error: "Upload failed: " + error.message }, { status: 500 });
        }

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from("uploads")
            .getPublicUrl(filename);

        return NextResponse.json({ url: publicUrl });

    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: "Upload failed: " + (error as Error).message }, { status: 500 });
    }
}
