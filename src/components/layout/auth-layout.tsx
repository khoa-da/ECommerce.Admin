import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const AuthLayout = () => {
    const location = useLocation();
    const accessToken = localStorage.getItem("accessToken");
    const from = location.state?.from || "/dashboard";

    // Kiểm tra nếu đã đăng nhập thì chuyển hướng đến trang trước đó hoặc dashboard
    if (accessToken) {
        return <Navigate to={from} replace />;
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">



            {/* Form đăng nhập/đăng ký bên phải */}
            <div className="flex flex-col flex-1 md:w-1/2 p-6 md:p-12 justify-center items-center bg-background">
                <Outlet />
                <div className="md:hidden mt-10 text-center text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Công ty của bạn. Tất cả các quyền được bảo lưu.</p>
                </div>
            </div>
        </div >
    );
};

export default AuthLayout;