"use client";

import { updateComplaintStatus } from "@/actions/admin-complaint";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { MessageSquareReply } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function RespondComplaintDialog({ complaint }: { complaint: any }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <MessageSquareReply className="mr-2 h-4 w-4" /> Respon
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Tanggapi Pengaduan</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="bg-slate-50 p-4 rounded-md space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Tiket: <span className="font-mono font-bold">{complaint.ticketId}</span></span>
                            <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h4 className="font-bold">{complaint.title}</h4>
                        <p className="text-sm text-slate-700">{complaint.description}</p>
                        <div className="text-xs pt-2">
                            Oleh: {complaint.name} ({complaint.phone})
                        </div>
                    </div>

                    <form action={async (formData) => {
                        await updateComplaintStatus(complaint.id, null, formData);
                        setOpen(false);
                    }} className="space-y-4">

                        <div className="space-y-2">
                            <Label>Update Status</Label>
                            <Select name="status" defaultValue={complaint.status}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PENDING">Menunggu</SelectItem>
                                    <SelectItem value="PROCESSING">Diproses</SelectItem>
                                    <SelectItem value="RESOLVED">Selesai</SelectItem>
                                    <SelectItem value="REJECTED">Ditolak</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Tanggapan Admin</Label>
                            <Textarea
                                name="response"
                                placeholder="Tulis tanggapan untuk pelapor..."
                                defaultValue={complaint.response || ""}
                                rows={4}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="submit">Simpan Update</Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
