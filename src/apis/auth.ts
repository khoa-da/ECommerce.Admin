import httpClient from "@/lib/httpClient"
import { AuthLoginRequest, AuthResponse, RefreshTokenRequest } from "@/types/authentication"

export const loginApi = async (loginData: AuthLoginRequest): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>('/auth/login', loginData)
    return response.data
}
// export const refresheTokenApi = async (refreshToenData: RefreshTokenRequest): Promise<AuthResponse> => {
//     const response = await httpClient.post<AuthResponse>('/auth/refresh-token', refreshToenData)
//     return response.data
// }