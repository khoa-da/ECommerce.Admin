import httpClient from '@/lib/httpClient';
import { TPaginatedResponse } from '@/types/pagination';
import { Category, CreateCategoryPayload, UpdateCategoryPayload } from '@/types/category';

export const getCategoriesParents = async (page: number, size: number): Promise<TPaginatedResponse<Category>> => {
    const response = await httpClient.get<TPaginatedResponse<Category>>('/categories/parents/admin', {
        params: {
            page,
            size,
        },
    });
    return response.data;
};
export const getCategoriesChildren = async (page: number, size: number): Promise<TPaginatedResponse<Category>> => {
    const response = await httpClient.get<TPaginatedResponse<Category>>('/categories/children/admin', {
        params: {
            page,
            size,
        },
    });
    return response.data;
}
export const getCategoriesChildrenSelectAdmin = async (page: number, size: number): Promise<TPaginatedResponse<Category>> => {
    const response = await httpClient.get<TPaginatedResponse<Category>>('/categories/children', {
        params: {
            page,
            size,
        },
    });
    return response.data;
}
export const createCategory = async (payload: CreateCategoryPayload): Promise<Category> => {
    const response = await httpClient.post<Category>('/categories', payload);
    console.log('createCategory', response.data);

    console.log('Payload:', payload);
    return response.data;
};

export const updateCategory = async (payload: UpdateCategoryPayload): Promise<Category> => {
    const response = await httpClient.put<Category>(`/categories/${payload.id}`, payload);
    return response.data;
};

export const inactivateCategory = async (id: string): Promise<void> => {
    await httpClient.delete(`/categories/${id}`);
}


