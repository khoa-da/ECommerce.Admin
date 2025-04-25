import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components để hiển thị trong khi lazy loading
import LoadingSpinner from "@/components/ui/loading-spinner";
import { AuthGuard } from "@/providers/guard-provider";


// Lazy load các trang
const LoginPage = lazy(() => import("@/pages/login"));


// Layout components
const MainLayout = lazy(() => import("@/components/layout/main-layout"));
const AuthLayout = lazy(() => import("@/components/layout/auth-layout"));

const AppRouter = () => {
    return (

        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<LoginPage />} />
                    {/* <Route path="/register" element={<RegisterPage />} /> */}
                    {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} /> */}
                </Route>

                {/* Protected Routes */}
                <Route element={<AuthGuard><MainLayout /></AuthGuard>}>
                    {/* <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/settings" element={<SettingsPage />} /> */}
                </Route>

                {/* Redirect root to dashboard if authenticated, otherwise to login */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                {/* 404 page */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </Suspense>

    );
};

export default AppRouter;