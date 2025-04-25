import { Link } from "react-router-dom";
import { Product } from "../../types/product";
import { useCart } from "../../contexts/CartContext";

interface ProductCardProps {
    product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const handleAddToCart = () => {
        if (!product) return;

        addToCart(product, 1, product.sizes[0], product.colors[0]);
        alert('Sản phẩm đã được thêm vào giỏ hàng');
    }
    return (
        <div className="group relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
            <Link to={`/product/${product.id}`}>
                <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden bg-gray-200">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover object-center group-hover:opacity-90 transition-opacity"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{product.price.toLocaleString('vi-VN')} ₫</p>
                    <div className="mt-1 flex items-center space-x-1">
                        {product.colors.map((color) => (
                            <span
                                key={color}
                                className="inline-block h-4 w-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>
            </Link>
            <button className="absolute bottom-4 right-4 bg-black text-white py-2 px-4 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleAddToCart}>
                Thêm vào giỏ
            </button>
        </div>
    );
};

export default ProductCard;