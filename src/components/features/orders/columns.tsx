import { ColumnDef } from '@tanstack/react-table';
import { Order } from '@/types/order';
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

import { useQueryClient } from '@tanstack/react-query';

export const orderColumns: ColumnDef<Order>[] = [
    {
        accessorKey: "orderNumber",
        header: "Order Number",
    },
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
    },
    {
        accessorKey: "orderDate",
        header: "Order Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("orderDate"));
            return <div>{date.toLocaleDateString()}</div>;
        },
    },
    {
        accessorKey: "totalAmount",
        header: "Total Amount",
        cell: ({ row }) => {
            const total = row.getValue("totalAmount") as number;
            return <div>${total.toFixed(2)}</div>;
        },
    },
    {
        accessorKey: "orderStatus",
        header: "Status",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const order = row.original;
            const queryClient = useQueryClient();

            const handleView = () => {
                window.location.href = `/orders/${order.id}`;
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={handleView}>
                            View / Edit
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
