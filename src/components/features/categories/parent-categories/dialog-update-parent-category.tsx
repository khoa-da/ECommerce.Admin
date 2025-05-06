"use client";

import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateCategoryApi } from "@/hooks/category/mutation";
import { toast } from "sonner";

interface DialogUpdateParentCategoryProps {
    categoryId: string;
    initialName: string;
    initialDescription: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function DialogUpdateParentCategory({
    categoryId,
    initialName,
    initialDescription,
    open,
    setOpen,
}: DialogUpdateParentCategoryProps) {
    const queryClient = useQueryClient();
    const { updateCategoryMutation } = useUpdateCategoryApi();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (open) {
            setName(initialName);
            setDescription(initialDescription);
        }
    }, [open, initialName, initialDescription]);

    const handleUpdate = () => {
        if (!name.trim()) return;

        updateCategoryMutation.mutate(
            {
                id: categoryId,
                name,
                description,
            },
            {
                onSuccess: () => {
                    toast.success("Cập nhật danh mục thành công!");
                    queryClient.invalidateQueries({ queryKey: ["parent-categories"] });
                    setOpen(false);
                },
                onError: () => {
                    toast.error("Cập nhật thất bại!");
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
                    <DialogDescription>
                        Chỉnh sửa tên và mô tả danh mục bên dưới. Nhấn "Lưu" khi hoàn tất.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4" onClick={(e) => e.stopPropagation()}>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Tên
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                            autoFocus
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Mô tả
                        </Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={handleUpdate}
                        disabled={updateCategoryMutation.isPending}
                    >
                        {updateCategoryMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
