import { LoginForm } from '@/components/features/login'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Đăng nhập</h1>
                    <p className="text-sm text-muted-foreground">Nhập thông tin đăng nhập của bạn bên dưới</p>
                </div>
                <LoginForm />
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link to="/register" className="hover:text-brand underline underline-offset-4">
                        Chưa có tài khoản? Đăng ký
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage