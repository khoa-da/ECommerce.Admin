import { useMutation } from "@tanstack/react-query"
import httpClient from "@/lib/httpClient"
import { AuthLoginRequest, AuthResponse } from "@/types/authentication"

// Function API gọi đăng nhập
const loginApi = async (loginData: AuthLoginRequest): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>('/auth/login', loginData)
    return response.data
}

/**
 * Hook cung cấp các mutation/query liên quan đến xác thực
 * Không chứa logic xử lý, chỉ return các mutation để component sử dụng
 */
export function useAuthApi() {
    // Login mutation
    const loginMutation = useMutation({
        mutationFn: loginApi
    })

    return {
        loginMutation
    }
}