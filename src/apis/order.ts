import httpClient from "@/lib/httpClient";
import { Order } from "@/types/order";
import { TPaginatedResponse } from "@/types/pagination";

export const getOrders = async (page: number, size: number): Promise<TPaginatedResponse<Order>> => {
    const response = await httpClient.get<TPaginatedResponse<Order>>(`/orders`, {
        params: {
            page,
            size
        }
    });
    return response.data;
};




export const updateOrderStatus = async (orderId: string, orderStatus: string): Promise<boolean> => {
    try {
        console.log(`Calling API with orderId: ${orderId}, orderStatus: ${orderStatus}`);

        const response = await httpClient.put('/orders/status', {
            orderId: orderId,
            orderStatus: orderStatus
        });

        console.log("API Response:", response);

        // Kiểm tra mã trạng thái HTTP 200 (OK)
        if (response.status === 200) {
            console.log("Order status updated successfully!");
            return true;
        } else {
            console.error(`Failed to update order status: ${response.statusText}`);
            return false;
        }
    } catch (error) {
        console.error("Error updating order status:", error);
        return false;
    }
};

