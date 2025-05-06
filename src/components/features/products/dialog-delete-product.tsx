"use client";

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ReactNode, useState } from "react";

type DeleteConfirmDialogProps = {
    title?: string;
    description?: string;
    trigger: ReactNode;
    onConfirm: () => void;
    loading?: boolean;
};

export default function DeleteConfirmDialog({
    title = "Confirm Deletion",
    description = "This action cannot be undone. Are you sure you want to delete?",
    trigger,
    onConfirm,
    loading = false,
}: DeleteConfirmDialogProps) {
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
        onConfirm();
        // Only close the dialog if not in loading state
        // This prevents UI flickering when deleting
        if (!loading) {
            setOpen(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Yes, delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}