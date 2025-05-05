"use client";

import { useState } from "react";
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
import { useCategoryApi } from "@/hooks/category/mutation";

export function DialogCreateParentCategory() {
    const queryClient = useQueryClient();
    const { categoryMutation } = useCategoryApi();

    const [open, setOpen] = useState(false); // 👈 thêm state control open/close
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSave = () => {
        if (!name) return;

        categoryMutation.mutate(
            {
                name,
                description,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["parent-categories"] });

                    // Reset form
                    setName("");

                    setDescription("");
                    setOpen(false); // 👈 đóng dialog khi tạo thành công
                },
                onError: (error) => {
                    console.error("Failed to create category", error);
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Category</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new category. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                            placeholder="Enter category name"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="col-span-3"
                            placeholder="Enter description"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={handleSave}
                        disabled={categoryMutation.isPending}
                    >
                        {categoryMutation.isPending ? "Saving..." : "Save changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
