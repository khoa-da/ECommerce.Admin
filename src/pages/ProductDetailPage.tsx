import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types/product';
// Mock API call - in a real app, this would fetch from your backend
const fetchProduct = async (id: string): Promise<Product> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockProducts: Product[] = [
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
            imageUrl: 'https://img.freepik.com/premium-psd/studio-shot-black-tshirt-white-background_1153121-10726.jpg',
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
            imageUrl: 'https://img.freepik.com/premium-psd/studio-shot-black-tshirt-white-background_1153121-10726.jpg',
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
            imageUrl: 'https://img.freepik.com/premium-psd/studio-shot-black-tshirt-white-background_1153121-10726.jpg',
            category: 'men',
            sizes: ['M', 'L', 'XL'],
            colors: ['#000000', '#808080'],
            inStock: true
        },
        {
            id: '5',
            name: 'Áo sơ mi linen',
            price: 350000,
            description: 'Áo sơ mi linen thoáng mát cho mùa hè',
            imageUrl: 'https://img.freepik.com/premium-psd/studio-shot-black-tshirt-white-background_1153121-10726.jpg',
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
            imageUrl: 'https://img.freepik.com/premium-psd/studio-shot-black-tshirt-white-background_1153121-10726.jpg',
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
            imageUrl: 'https://img.freepik.com/premium-psd/studio-shot-black-tshirt-white-background_1153121-10726.jpg',
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
            imageUrl: 'https://img.freepik.com/premium-psd/studio-shot-black-tshirt-white-background_1153121-10726.jpg',
            category: 'women',
            sizes: ['S', 'M', 'L'],
            colors: ['#F5F5DC', '#000000', '#FFFFFF'],
            inStock: true
        }
    ];
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
        throw new Error('Product not found');
    }

    return product;
};


const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [sizeError, setSizeError] = useState(false);
    const [colorError, setColorError] = useState(false);

    // Color names mapping
    const colorNames: { [key: string]: string } = {
        '#000000': 'Đen',
        '#FFFFFF': 'Trắng',
        '#0000FF': 'Xanh',
        '#FF0000': 'Đỏ'
    };

    useEffect(() => {
        const getProduct = async () => {
            if (!id) {
                console.log(id);

                setError('Product ID is missing');
                setLoading(false);
                // console.log('Product ID is missing');

                return;
            }

            try {
                const data = await fetchProduct(id);


                setProduct(data);

                // Set defaults if available
                if (data.sizes.length > 0) {
                    setSelectedSize(data.sizes[0]);
                }
                if (data.colors.length > 0) {
                    setSelectedColor(data.colors[0]);
                }
            } catch (err) {
                setError('Failed to load product');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

        // Reset errors
        setSizeError(false);
        setColorError(false);

        // Validate selections
        let isValid = true;

        if (!selectedSize) {
            setSizeError(true);
            isValid = false;
        }

        if (!selectedColor) {
            setColorError(true);
            isValid = false;
        }

        if (!isValid) return;

        // Add to cart
        addToCart(product, quantity, selectedSize, selectedColor);

        // Show success message or open cart drawer
        // This could be implemented with a toast notification
        alert('Sản phẩm đã được thêm vào giỏ hàng');
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h1>
                <p className="mb-6">{error || 'Product not found'}</p>
                <Link to="/products" className="inline-block px-6 py-3 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors">
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-gray-600 hover:text-gray-900">
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <Link to="/products" className="ml-1 text-gray-600 hover:text-gray-900 md:ml-2">
                                    Sản phẩm
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <span className="ml-1 text-gray-500 md:ml-2">{product.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div>
                    <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                    <div className="text-2xl font-bold text-gray-900 mb-6">
                        {product.price.toLocaleString('vi-VN')} ₫
                    </div>

                    <p className="text-gray-700 mb-6">
                        {product.description}
                    </p>

                    <div className="mb-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-2">Kích thước</h2>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    type="button"
                                    className={`px-4 py-2 border ${selectedSize === size
                                        ? 'border-gray-900 bg-gray-900 text-white'
                                        : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                                        } rounded-md focus:outline-none`}
                                    onClick={() => {
                                        setSelectedSize(size);
                                        setSizeError(false);
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        {sizeError && (
                            <p className="mt-2 text-sm text-red-600">Vui lòng chọn kích thước</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-2">Màu sắc</h2>
                        <div className="flex flex-wrap gap-2">
                            {product.colors.map(color => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`h-10 w-10 rounded-full border ${selectedColor === color
                                        ? 'ring-2 ring-offset-2 ring-gray-900'
                                        : 'border-gray-300'
                                        } focus:outline-none`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => {
                                        setSelectedColor(color);
                                        setColorError(false);
                                    }}
                                    title={colorNames[color]}
                                >
                                    <span className="sr-only">{colorNames[color]}</span>
                                </button>
                            ))}
                        </div>
                        {colorError && (
                            <p className="mt-2 text-sm text-red-600">Vui lòng chọn màu sắc</p>
                        )}
                        {selectedColor && (
                            <p className="mt-2 text-sm text-gray-600">
                                Màu: {colorNames[selectedColor]}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-2">Số lượng</h2>
                        <div className="flex items-center border border-gray-300 rounded-md w-32">
                            <button
                                type="button"
                                className="w-10 h-10 text-gray-600 hover:text-gray-900 flex items-center justify-center focus:outline-none"
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                </svg>
                            </button>
                            <input
                                type="number"
                                className="w-12 h-10 text-center border-none focus:outline-none focus:ring-0"
                                value={quantity}
                                min="1"
                                readOnly
                            />
                            <button
                                type="button"
                                className="w-10 h-10 text-gray-600 hover:text-gray-900 flex items-center justify-center focus:outline-none"
                                onClick={() => setQuantity(prev => prev + 1)}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <button
                            type="button"
                            className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                        >
                            {product.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                        </button>
                        <Link
                            to="/checkout"
                            className={`flex-1 bg-gray-100 text-gray-900 py-3 px-6 rounded-md font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 flex items-center justify-center ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={(e) => !product.inStock && e.preventDefault()}
                        >
                            Mua ngay
                        </Link>
                    </div>

                    <div className="border-t border-gray-200 pt-6 space-y-4">
                        <div className="flex items-start">
                            <svg className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-900">Bảo hành 30 ngày</h3>
                                <p className="text-sm text-gray-600">Đổi trả trong 30 ngày nếu không hài lòng.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <svg className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-900">Giao hàng toàn quốc</h3>
                                <p className="text-sm text-gray-600">Giao hàng nhanh trong 2-5 ngày.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <svg className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-900">Thanh toán an toàn</h3>
                                <p className="text-sm text-gray-600">Nhiều phương thức thanh toán.</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-2">Thông tin sản phẩm</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="text-sm">
                                <p className="text-gray-600">Danh mục: <span className="text-gray-900 capitalize">{product.category.replace('-', ' ')}</span></p>
                            </div>
                            <div className="text-sm">
                                <p className="text-gray-600">Trạng thái: <span className="text-gray-900">{product.inStock ? 'Còn hàng' : 'Hết hàng'}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* You can add product recommendations, reviews, etc. here */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm tương tự</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* This would typically be populated from an API */}
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="group">
                            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                                <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;