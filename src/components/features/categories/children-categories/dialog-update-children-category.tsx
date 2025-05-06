"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useUpdateCategoryApi } from "@/hooks/category/mutation";
import { useCategoriesParents } from "@/hooks/category/query";

interface DialogUpdateChildrenCategoryProps {
    categoryId: string;
    initialName: string;
    initialDescription: string;
    initialParentId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function DialogUpdateChildrenCategory({
    categoryId,
    initialName,
    initialDescription,
    initialParentId,
    open,
    setOpen,
}: DialogUpdateChildrenCategoryProps) {
    const queryClient = useQueryClient();
    const { updateCategoryMutation } = useUpdateCategoryApi();
    const { data: parentCategories, isLoading: loadingParents } = useCategoriesParents(1, 100);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [parentId, setParentId] = useState("");

    useEffect(() => {
        if (open) {
            setName(initialName);
            setDescription(initialDescription);
            setParentId(initialParentId);
        }
    }, [open, initialName, initialDescription, initialParentId]);

    const handleUpdate = () => {
        if (!name.trim()) return;

        updateCategoryMutation.mutate(
            {
                id: categoryId,
                name,
                description,
                parentId,
            },
            {
                onSuccess: () => {
                    toast.success("Category updated successfully!");
                    queryClient.invalidateQueries({ queryKey: ["children-categories"] });
                    setOpen(false);
                },
                onError: () => {
                    toast.error("Failed to update category.");
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Subcategory</DialogTitle>
                    <DialogDescription>
                        Modify the name, description, and parent category. Click save to apply changes.
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
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="parentId" className="text-right">
                            Parent Category
                        </Label>
                        <Select value={parentId} onValueChange={setParentId}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder={loadingParents ? "Loading..." : "Select Parent Category"} />
                            </SelectTrigger>
                            <SelectContent>
                                {parentCategories?.items.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={handleUpdate}
                        disabled={updateCategoryMutation.isPending}
                    >
                        {updateCategoryMutation.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
