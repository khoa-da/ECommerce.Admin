import httpClient from '@/lib/httpClient';
import { TPaginatedResponse } from '@/types/pagination';
import { Category } from '@/types/category';

export const getCategoriesParents = async (): Promise<TPaginatedResponse<Category>> => {
    const response = await httpClient.get<TPaginatedResponse<Category>>('/categories/parents');
    return response.data;
};
export const getCategoriesChildren = async (): Promise<TPaginatedResponse<Category>> => {
    const response = await httpClient.get<TPaginatedResponse<Category>>('/categories/children');
    return response.data;
}
