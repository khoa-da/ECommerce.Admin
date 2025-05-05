import { useMutation } from "@tanstack/react-query"
import { loginApi } from "@/apis/auth"




/**
 * Hook cung cấp các mutation/query liên quan đến xác thực
 * Không chứa logic xử lý, chỉ return các mutation để component sử dụng
 */
export function useAuthApi() {
    const loginMutation = useMutation({
        mutationFn: loginApi
    })

    return {
        loginMutation
    }
}