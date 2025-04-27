import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components để hiển thị trong khi lazy loading
import LoadingSpinner from "@/components/ui/loading-spinner";
import { AuthGuard } from "@/providers/guard-provider";
import AdminLayout from "@/components/layout/admin-layout";



// Lazy load các trang
const LoginPage = lazy(() => import("@/pages/login"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const ParentsCategoryPage = lazy(() => import("@/pages/parents-categories"));
const ChildrensCategoryPage = lazy(() => import("@/pages/childrens-categories"));
const ProductPage = lazy(() => import("@/pages/products"));
const UserPage = lazy(() => import("@/pages/user"));
// Layout components
const MainLayout = lazy(() => import("@/components/layout/main-layout"));
const AuthLayout = lazy(() => import("@/components/layout/auth-layout"));

const AppRouter = () => {
    return (

        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route element={<MainLayout />}>


                    <Route element={<AuthLayout />}>
                        <Route path="/" element={<LoginPage />} />
                    </Route>
                    <Route element={<AuthGuard><AdminLayout /></AuthGuard>}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/parents-category" element={<ParentsCategoryPage />} />
                        <Route path="/childrens-category" element={<ChildrensCategoryPage />} />
                        <Route path="/products" element={<ProductPage />} />
                        <Route path="/user" element={<UserPage />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>

            </Routes>
        </Suspense>

    );
};

export default AppRouter;