import { getProducts } from "@/apis/product"
import { useQuery } from "@tanstack/react-query"

export const useProducts = (page: number, size: number) => {
    return useQuery({
        queryKey: ["products", page, size],
        queryFn: () => getProducts(page, size),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}