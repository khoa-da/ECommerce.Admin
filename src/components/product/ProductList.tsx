import { Product } from "../../types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
    products: Product[];
    title?: string;
}
const ProductList: React.FC<ProductListProps> = ({ products, title }) => {
    return (
        <section className="py-8">
            {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductList;