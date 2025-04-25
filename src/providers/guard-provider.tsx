import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthGuardProps {
    children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const location = useLocation();
    const accessToken = localStorage.getItem("accessToken");

    // Kiểm tra xem token có tồn tại không
    if (!accessToken) {
        // Redirect đến trang đăng nhập nếu không có token
        // Lưu lại path hiện tại để sau khi đăng nhập có thể quay lại
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // Có thể thêm logic kiểm tra token hết hạn tại đây
    // Ví dụ: kiểm tra thời gian hết hạn của token trong localStorage

    return <>{children}</>;
};