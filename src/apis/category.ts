import httpClient from '@/lib/httpClient';
import { TPaginatedResponse } from '@/types/pagination';
import { Category, CreateCategoryPayload } from '@/types/category';

export const getCategoriesParents = async (): Promise<TPaginatedResponse<Category>> => {
    const response = await httpClient.get<TPaginatedResponse<Category>>('/categories/parents');
    return response.data;
};
export const getCategoriesChildren = async (): Promise<TPaginatedResponse<Category>> => {
    const response = await httpClient.get<TPaginatedResponse<Category>>('/categories/children');
    return response.data;
}
export const createCategory = async (payload: CreateCategoryPayload): Promise<Category> => {
    const response = await httpClient.post<Category>('/categories', payload);
    console.log('createCategory', response.data);

    console.log('Payload:', payload);
    return response.data;
};
