// hooks/useUpdateOrderStatusApi.ts
import { updateOrderStatus } from "@/apis/order";
import { useMutation } from "@tanstack/react-query";

export function useUpdateOrderStatusApi() {
    const updateOrderStatusMutation = useMutation({
        mutationFn: ({ orderId, orderStatus }: { orderId: string; orderStatus: string }) =>
            updateOrderStatus(orderId, orderStatus),
        onSuccess: () => {
            console.log("Order status updated successfully!");
        },
        onError: (error) => {
            console.error("Failed to update order status:", error);
        },
    });

    return {
        updateOrderStatusMutation,
    };
}
