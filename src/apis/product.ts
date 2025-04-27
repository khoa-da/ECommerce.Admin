import httpClient from "@/lib/httpClient";
import { TPaginatedResponse } from "@/types/pagination";
import { Product } from "@/types/product";


export const getProducts = async (page: number, size: number): Promise<TPaginatedResponse<Product>> => {
    const response = await httpClient.get<TPaginatedResponse<Product>>(`/products`, {
        params: {
            page,
            size
        }
    });
    return response.data;
};