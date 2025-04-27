import httpClient from "@/lib/httpClient"
import { TPaginatedResponse } from "@/types/pagination"
import { User } from "@/types/user";

export const getUsers = async (page: number, size: number): Promise<TPaginatedResponse<User>> => {
    const response = await httpClient.get<TPaginatedResponse<User>>(`/users`, {
        params: {
            page,
            size
        }
    })
    return response.data;
}