import { ColumnDef } from '@tanstack/react-table';
import { Product } from '@/types/product';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DialogProductDetail } from '@/components/features/products/dialog-product-detail';

export const productColumns: ColumnDef<Product>[] = [
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
        accessorKey: "mainImage",
        header: "Image",
        cell: ({ row }) => {
            const img = row.getValue("mainImage") as string | null;
            return img ? (
                <img src={img} alt="Product" className="h-12 w-12 object-cover rounded" />
            ) : (
                <div className="text-muted">No image</div>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "categoryName",
        header: "Category",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = row.getValue("price") as number;
            return <div>${price}</div>;
        },
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(product.id)}
                        >
                            Copy Product ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem asChild>
                            <DialogProductDetail productId={product.id} />
                        </DropdownMenuItem> */}
                        <DropdownMenuItem
                            onClick={() => window.location.href = `/products/${product.id}`}
                        >
                            View / Edit
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
