import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import { Product } from '../types/product';

const HomePage: React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [newArrivals, setNewArrivals] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Giả định: fetch dữ liệu từ API
        // Trong thực tế, bạn sẽ gọi API từ backend
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                // Dữ liệu mẫu
                const mockFeaturedProducts: Product[] = [
                    {
                        id: '1',
                        name: 'Áo thun basic',
                        price: 250000,
                        description: 'Áo thun basic chất liệu cotton 100%',
                        imageUrl: 'https://i.pinimg.com/736x/3e/96/83/3e9683c83e26feef804a0d5b70dafcc2.jpg',
                        category: 'men',
                        sizes: ['S', 'M', 'L', 'XL'],
                        colors: ['#000000', '#FFFFFF', '#0000FF'],
                        inStock: true
                    },
                    {
                        id: '2',
                        name: 'Quần jeans slim fit',
                        price: 550000,
                        description: 'Quần jeans slim fit chất liệu denim cao cấp',
                        imageUrl: 'https://via.placeholder.com/400x500',
                        category: 'men',
                        sizes: ['29', '30', '31', '32', '33'],
                        colors: ['#000080', '#4B0082'],
                        inStock: true
                    },
                    {
                        id: '3',
                        name: 'Đầm suông dáng dài',
                        price: 450000,
                        description: 'Đầm suông dáng dài phong cách vintage',
                        imageUrl: 'https://via.placeholder.com/400x500',
                        category: 'women',
                        sizes: ['S', 'M', 'L'],
                        colors: ['#FF0000', '#FFC0CB', '#000000'],
                        inStock: true
                    },
                    {
                        id: '4',
                        name: 'Áo khoác bomber',
                        price: 750000,
                        description: 'Áo khoác bomber chống nước',
                        imageUrl: 'https://via.placeholder.com/400x500',
                        category: 'men',
                        sizes: ['M', 'L', 'XL'],
                        colors: ['#000000', '#808080'],
                        inStock: true
                    }
                ];

                const mockNewArrivals = [
                    {
                        id: '5',
                        name: 'Áo sơ mi linen',
                        price: 350000,
                        description: 'Áo sơ mi linen thoáng mát cho mùa hè',
                        imageUrl: 'https://via.placeholder.com/400x500',
                        category: 'men',
                        sizes: ['S', 'M', 'L', 'XL'],
                        colors: ['#FFFFFF', '#87CEEB', '#F5F5DC'],
                        inStock: true
                    },
                    {
                        id: '6',
                        name: 'Quần short khaki',
                        price: 320000,
                        description: 'Quần short khaki thoải mái, năng động',
                        imageUrl: 'https://via.placeholder.com/400x500',
                        category: 'men',
                        sizes: ['29', '30', '31', '32'],
                        colors: ['#F5F5DC', '#808080'],
                        inStock: true
                    },
                    {
                        id: '7',
                        name: 'Váy maxi hoa',
                        price: 490000,
                        description: 'Váy maxi họa tiết hoa mùa hè',
                        imageUrl: 'https://via.placeholder.com/400x500',
                        category: 'women',
                        sizes: ['S', 'M', 'L'],
                        colors: ['#FF69B4', '#00FFFF'],
                        inStock: true
                    },
                    {
                        id: '8',
                        name: 'Áo blazer linen',
                        price: 850000,
                        description: 'Áo blazer linen kiểu dáng thanh lịch',
                        imageUrl: 'https://via.placeholder.com/400x500',
                        category: 'women',
                        sizes: ['S', 'M', 'L'],
                        colors: ['#F5F5DC', '#000000', '#FFFFFF'],
                        inStock: true
                    }
                ];

                setFeaturedProducts(mockFeaturedProducts);
                setNewArrivals(mockNewArrivals);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-xl">Đang tải...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-gray-900 text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://i.pinimg.com/736x/9b/65/19/9b651946edd3f1ad87adc130f0757b83.jpg"
                        alt="Fashion Banner"
                        className="w-full h-full object-cover opacity-50"
                    />
                </div>
                <div className="relative container mx-auto px-4 py-32">
                    <div className="max-w-xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Bộ sưu tập mới nhất</h1>
                        <p className="text-lg mb-8">Khám phá phong cách thời trang mới nhất với các thiết kế độc đáo và chất liệu cao cấp.</p>
                        <Link to="/products" className="inline-block bg-white text-gray-900 font-medium py-3 px-8 rounded-md hover:bg-gray-100 transition-colors">
                            Khám phá ngay
                        </Link>
                    </div>
                </div>
            </section>

            {/* Category Banners */}
            <section className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative rounded-lg overflow-hidden group h-64">
                        <img
                            src="https://via.placeholder.com/800x600"
                            alt="Men's Collection"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="text-center">
                                <h3 className="text-white text-2xl font-bold mb-3">Thời trang nam</h3>
                                <Link to="/products/men" className="inline-block bg-white text-gray-900 py-2 px-6 rounded-md hover:bg-gray-100 transition-colors">
                                    Xem ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden group h-64">
                        <img
                            src="https://via.placeholder.com/800x600"
                            alt="Women's Collection"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="text-center">
                                <h3 className="text-white text-2xl font-bold mb-3">Thời trang nữ</h3>
                                <Link to="/products/women" className="inline-block bg-white text-gray-900 py-2 px-6 rounded-md hover:bg-gray-100 transition-colors">
                                    Xem ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-4 py-12">
                <ProductList products={featuredProducts} title="Sản phẩm nổi bật" />
                <div className="text-center mt-8">
                    <Link to="/products" className="inline-block border border-gray-900 text-gray-900 font-medium py-2 px-8 rounded-md hover:bg-gray-900 hover:text-white transition-colors">
                        Xem tất cả sản phẩm
                    </Link>
                </div>
            </section>

            {/* New Arrivals */}
            <section className="container mx-auto px-4 py-12 bg-gray-50">
                <ProductList products={newArrivals} title="Hàng mới về" />
            </section>

            {/* Newsletter */}
            <section className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Đăng ký nhận tin</h2>
                    <p className="text-lg mb-8 max-w-xl mx-auto">Đăng ký để nhận thông tin về bộ sưu tập mới và các ưu đãi đặc biệt.</p>
                    <form className="max-w-md mx-auto flex">
                        <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            className="flex-grow px-4 py-3 rounded-l-md focus:outline-none text-gray-900"
                        />
                        <button
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-r-md"
                        >
                            Đăng ký
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default HomePage;