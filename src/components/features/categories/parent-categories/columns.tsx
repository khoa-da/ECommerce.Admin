import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import DialogUpdateParentCategory from "../parent-categories/dialog-update-parent-category";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useInactivateCategoryApi } from "@/hooks/category/mutation";
import { toast } from "sonner";

export const columns: ColumnDef<Category>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const category = row.original;
            const [dropdownOpen, setDropdownOpen] = useState(false);
            const [dialogOpen, setDialogOpen] = useState(false);

            const queryClient = useQueryClient()
            const { inactivateCategoryMutation } = useInactivateCategoryApi();
            const handleInactivate = () => {
                inactivateCategoryMutation.mutate(category.id, {
                    onSuccess: () => {
                        toast.success("Category inactivated!");
                        queryClient.invalidateQueries({ queryKey: ["parent-categories"] });
                    },
                    onError: () => {
                        toast.error("Failed to inactivate category.");
                    },
                });
            };
            return (
                <>
                    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(category.id)
                                }
                            >
                                Copy Category ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <div
                                    className="w-full text-left cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDropdownOpen(false);
                                        setTimeout(() => {
                                            setDialogOpen(true);
                                        }, 0);
                                    }}
                                >
                                    Edit
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setDropdownOpen(false);
                                    handleInactivate();
                                }}
                                className="text-red-600"
                            >
                                Inactivate
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogUpdateParentCategory
                        categoryId={category.id}
                        initialName={category.name}
                        initialDescription={category.description}
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                    />
                </>
            );
        },
    },
];
