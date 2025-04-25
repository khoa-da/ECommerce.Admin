import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useAuthApi } from "@/hooks/auth/mutation" // Import custom hook
import { AuthLoginRequest } from "@/types/authentication"

// Schema form đăng nhập
const formSchema = z.object({
    usernameOrEmail: z.string().min(1, {
        message: "Vui lòng nhập email hoặc tên đăng nhập.",
    }),
    password: z.string().min(1, {
        message: "Mật khẩu phải có ít nhất 6 ký tự.",
    })
})

export function LoginForm() {
    const navigate = useNavigate()

    // Lấy mutation từ custom hook
    const { loginMutation } = useAuthApi()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            usernameOrEmail: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Chuẩn bị dữ liệu đăng nhập theo interface
            const loginData: AuthLoginRequest = {
                usernameOrEmail: values.usernameOrEmail,
                password: values.password
            }

            // Gọi mutation để đăng nhập và đợi kết quả
            const userData = await loginMutation.mutateAsync(loginData)

            // Lưu thông tin người dùng vào localStorage
            localStorage.setItem('accessToken', userData.accessToken)
            localStorage.setItem('refreshToken', userData.refreshToken)
            localStorage.setItem('userId', userData.userId)
            localStorage.setItem('userRole', userData.role)
            localStorage.setItem('userEmail', userData.email)

            // Thông báo thành công
            toast.success("Đăng nhập thành công!", {
                description: `Chào mừng ${userData.firstName || userData.username} quay trở lại.`
            })

            // Chuyển hướng đến trang chính
            navigate("/dashboard")

        } catch (error: any) {
            // Xử lý lỗi
            toast.error("Đăng nhập thất bại", {
                description: error.response?.data?.message || "Tên đăng nhập hoặc mật khẩu không đúng."
            })
        }
    }

    return (
        <div className="grid gap-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="usernameOrEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email hoặc tên đăng nhập</FormLabel>
                                <FormControl>
                                    <Input placeholder="name@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}