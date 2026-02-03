"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
    action: () => Promise<any>;
}

export function DeleteButton({ action }: DeleteButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Data ini akan dihapus permanen dari database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={() => action()} className="bg-red-600 hover:bg-red-700">
                        Ya, Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
