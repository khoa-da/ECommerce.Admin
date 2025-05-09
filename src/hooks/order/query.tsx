import { getOrders } from "@/apis/order"
import { useQuery } from "@tanstack/react-query"

export const useOrder = (page: number, size: number) => {
    return useQuery({
        queryKey: ["orders", page, size],
        queryFn: () => getOrders(page, size),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}