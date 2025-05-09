import React from 'react';
import { Order } from '@/types/order';
import { OrderItem } from '@/types/order-item';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface DialogOrderDetailProps {
    order: Order;
    onClose: () => void;
    open: boolean;
}

const DialogOrderDetail: React.FC<DialogOrderDetailProps> = ({ order, onClose, open }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogDescription>Order Number: {order.orderNumber}</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-96 space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-md font-semibold">Customer Information</h2>
                        <p>Name: {order.firstName} {order.lastName}</p>
                        <p>Email: {order.email}</p>
                        <p>Phone: {order.phoneNumber}</p>
                        <Separator className="my-2" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-md font-semibold">Store Information</h2>
                        <p>Store Name: {order.storeName}</p>
                        <p>Store Phone: {order.storePhoneNumber}</p>
                        <Separator className="my-2" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-md font-semibold">Order Information</h2>
                        <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                        <p>Total Amount: {order.totalAmount.toLocaleString()} VND</p>
                        <p>Payment Status: {order.paymentStatus}</p>
                        <p>Order Status: {order.orderStatus}</p>
                        <p>Payment Method: {order.paymentMethod}</p>
                        <p>Shipping Address: {order.shippingAddress || 'N/A'}</p>
                        <p>Billing Address: {order.billingAddress || 'N/A'}</p>
                        <Separator className="my-2" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-md font-semibold">Order Items</h2>
                        {order.orderItems.map((item: OrderItem) => (
                            <div key={item.id} className="border rounded p-2 mb-2">
                                <p>Product Name: {item.productName}</p>
                                <p>Category: {item.categoryName}</p>
                                <p>Brand: {item.brand}</p>
                                <p>Gender: {item.gender}</p>
                                <p>Size: {item.size}</p>
                                <p>SKU: {item.sku}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: {item.price.toLocaleString()} VND</p>
                                <p>Total: {item.totalAmount.toLocaleString()} VND</p>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogOrderDetail;
