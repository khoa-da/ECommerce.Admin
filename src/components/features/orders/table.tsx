"use client";

import * as React from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrder } from "@/hooks/order/query";
import { orderColumns } from "@/components/features/orders/columns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DialogOrderDetail from "@/components/features/orders/dialog-order-detail";
import { useUpdateOrderStatusApi } from "@/hooks/order/mutation";

export function OrderTable() {
    const queryClient = useQueryClient();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [selectedOrder, setSelectedOrder] = React.useState(null);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const { updateOrderStatusMutation } = useUpdateOrderStatusApi();


    const { data, isLoading, error, refetch } = useOrder(page, pageSize);

    const table = useReactTable({
        data: data?.items ?? [],
        columns: orderColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handleViewDetails = (order: any) => {
        setSelectedOrder(order);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedOrder(null);
    };

    const updateOrderStatus = (orderId: string, orderStatus: string) => {
        // Gọi API cập nhật trạng thái đơn hàng thông qua mutation
        updateOrderStatusMutation.mutate(
            { orderId, orderStatus },
            {
                onSuccess: () => {
                    console.log(`Cập nhật đơn hàng ${orderId} thành trạng thái ${orderStatus} thành công!`);
                    refetch(); // Cập nhật lại danh sách đơn hàng sau khi cập nhật thành công
                },
                onError: (error) => {
                    console.error(`Cập nhật đơn hàng ${orderId} thất bại:`, error);
                },
            }
        );
    };



    const getButtonVariant = (currentStatus: string, buttonStatus: string) => {
        return currentStatus === buttonStatus ? "default" : "outline";
    };

    if (isLoading) return <div>Loading orders...</div>;
    if (error) return <div>Error loading orders</div>;

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search by order number..."
                    onChange={(event) => table.getColumn("orderNumber")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <Button onClick={() => refetch()} className="ml-2">Refresh</Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null :
                                            typeof header.column.columnDef.header === "function"
                                                ? header.column.columnDef.header(header.getContext())
                                                : header.column.columnDef.header}
                                    </TableHead>
                                ))}
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {typeof cell.column.columnDef.cell === "function"
                                                ? cell.column.columnDef.cell(cell.getContext())
                                                : cell.column.columnDef.cell}
                                        </TableCell>
                                    ))}
                                    <TableCell className="space-x-1">
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={() => handleViewDetails(row.original)}
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            variant={getButtonVariant(row.original.orderStatus, "Processing")}
                                            size="sm"
                                            onClick={() => updateOrderStatus(row.original.id, "Processing")}
                                        >
                                            Processing
                                        </Button>
                                        <Button
                                            variant={getButtonVariant(row.original.orderStatus, "Shipped")}
                                            size="sm"
                                            onClick={() => updateOrderStatus(row.original.id, "Shipped")}
                                        >
                                            Shipped
                                        </Button>
                                        <Button
                                            variant={getButtonVariant(row.original.orderStatus, "Delivered")}
                                            size="sm"
                                            onClick={() => updateOrderStatus(row.original.id, "Delivered")}
                                        >
                                            Delivered
                                        </Button>

                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={orderColumns.length + 1} className="text-center">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between py-4">
                <Button onClick={() => setPage(Math.max(page - 1, 1))} disabled={page === 1}>
                    Previous
                </Button>
                <span>Page {page}</span>
                <Button onClick={() => setPage(page + 1)} disabled={(data?.items?.length ?? 0) < pageSize}>
                    Next
                </Button>
            </div>

            {selectedOrder && (
                <DialogOrderDetail
                    order={selectedOrder}
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                />
            )}
        </div>
    );
}
