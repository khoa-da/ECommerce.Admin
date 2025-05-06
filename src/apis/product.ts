import httpClient from "@/lib/httpClient";
import { TPaginatedResponse } from "@/types/pagination";
import { CreateProductPayload, Product, ProductResponse, UpdateProductPayload } from "@/types/product";


export const getProducts = async (page: number, size: number): Promise<TPaginatedResponse<Product>> => {
    const response = await httpClient.get<TPaginatedResponse<Product>>(`/products/admin`, {
        params: {
            page,
            size
        }
    });
    return response.data;
};
export const createProduct = async (payload: CreateProductPayload): Promise<Product> => {
    const formData = new FormData();
    formData.append('Name', payload.name);
    formData.append('CategoryId', payload.categoryId);
    formData.append('Description', payload.description);
    formData.append('Price', payload.price.toString());
    formData.append('Gender', payload.gender.toString());
    formData.append('Size', payload.size.toString());
    formData.append('Stock', payload.stock.toString());
    formData.append('Brand', payload.brand.toString());
    formData.append('Sku', payload.sku);
    formData.append('Tags', payload.tags);
    formData.append('Material', payload.material);

    payload.productImageBase64.forEach((imageBase64) => {
        formData.append('ProductImageBase64', imageBase64);
    });

    const response = await httpClient.post<Product>('/products', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}
export const getProductById = async (id: string): Promise<ProductResponse> => {
    const response = await httpClient.get<ProductResponse>(`/products/${id}`);
    return response.data;
}
export const deleteProduct = async (id: string): Promise<void> => {
    await httpClient.delete(`/products/${id}`);
}
export const updateProduct = async (payload: UpdateProductPayload): Promise<void> => {
    const formData = new FormData();
    formData.append("Name", payload.name);
    formData.append("CategoryId", payload.categoryId);
    formData.append("Description", payload.description);
    formData.append("Price", payload.price.toString());
    formData.append("Gender", payload.gender.toString());
    formData.append("Size", payload.size.toString());
    formData.append("Stock", payload.stock.toString());
    formData.append("Brand", payload.brand.toString());
    formData.append("Sku", payload.sku);
    formData.append("Tags", payload.tags);
    formData.append("Material", payload.material);

    formData.append("Status", payload.status);
    payload.productImageBase64.forEach((imageBase64) => {
        formData.append("ProductImageBase64", imageBase64);
    });

    await httpClient.patch(`/products/${payload.id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};