import { useParams } from "react-router-dom";
import ProductForm from "@/components/features/products/product-form";

const ProductDetailPage = () => {
    const { id } = useParams();

    if (!id) return <div className="text-center text-red-500">Không tìm thấy sản phẩm</div>;

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[720px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Chỉnh sửa sản phẩm</h1>
                    <p className="text-sm text-muted-foreground">Cập nhật thông tin sản phẩm bên dưới</p>
                </div>
                <ProductForm productId={id} />
            </div>
        </div>
    );
};

export default ProductDetailPage;
