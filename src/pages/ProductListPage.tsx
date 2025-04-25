import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import { Product } from '../types/product';

const ProductListPage: React.FC = () => {
    const { category } = useParams<{ category?: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState({
        priceRange: [0, 2000000] as [number, number],
        sizes: [] as string[],
        colors: [] as string[],
    });
    const [sortOption, setSortOption] = useState('newest');

    useEffect(() => {
        // Giả định: fetch dữ liệu sản phẩm từ API dựa trên category
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                // Dữ liệu mẫu
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
                        imageUrl: 'https://cdn.kkfashion.vn/29100-large_default/dam-suong-dang-dai-co-vuong-tay-phong-kk167-17.jpg',
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

                // Lọc sản phẩm theo category nếu có
                const filteredProducts = category
                    ? mockProducts.filter(product => product.category === category)
                    : mockProducts;

                setProducts(filteredProducts);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
        // Logic sắp xếp sản phẩm sẽ được thêm sau
    };

    const handleFilterChange = (type: string, value: any) => {
        setFilters(prev => ({
            ...prev,
            [type]: value
        }));
        // Logic lọc sản phẩm sẽ được thêm sau
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <p className="text-xl">Đang tải...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                {category ? `Thời trang ${category === 'men' ? 'nam' : category === 'women' ? 'nữ' : category}` : 'Tất cả sản phẩm'}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Lọc sản phẩm</h2>

                        {/* Price Range Filter */}
                        <div className="mb-6">
                            <h3 className="text-md font-medium mb-2">Giá</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs text-gray-500">Từ</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded"
                                        placeholder="0 ₫"
                                        value={filters.priceRange[0]}
                                        onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500">Đến</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded"
                                        placeholder="2,000,000 ₫"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Size Filter */}
                        <div className="mb-6">
                            <h3 className="text-md font-medium mb-2">Kích thước</h3>
                            <div className="flex flex-wrap gap-2">
                                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                    <button
                                        key={size}
                                        className={`py-1 px-3 border rounded ${filters.sizes.includes(size) ? 'bg-gray-900 text-white' : 'border-gray-300'
                                            }`}
                                        onClick={() => {
                                            const newSizes = filters.sizes.includes(size)
                                                ? filters.sizes.filter(s => s !== size)
                                                : [...filters.sizes, size];
                                            handleFilterChange('sizes', newSizes);
                                        }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Filter */}
                        <div className="mb-6">
                            <h3 className="text-md font-medium mb-2">Màu sắc</h3>
                            <div className="flex flex-wrap gap-2">
                                {['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#FFFF00', '#008000'].map((color) => (
                                    <button
                                        key={color}
                                        className={`w-8 h-8 rounded-full ${filters.colors.includes(color) ? 'ring-2 ring-offset-2 ring-gray-900' : ''
                                            }`}
                                        style={{ backgroundColor: color, border: color === '#FFFFFF' ? '1px solid #e5e7eb' : 'none' }}
                                        onClick={() => {
                                            const newColors = filters.colors.includes(color)
                                                ? filters.colors.filter(c => c !== color)
                                                : [...filters.colors, color];
                                            handleFilterChange('colors', newColors);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            className="w-full py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
                            onClick={() => {
                                // Reset filters
                                setFilters({
                                    priceRange: [0, 2000000],
                                    sizes: [],
                                    colors: []
                                });
                            }}
                        >
                            Đặt lại bộ lọc
                        </button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="lg:col-span-3">
                    {/* Sort Options */}
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-gray-600">{products.length} sản phẩm</p>
                        <div className="flex items-center">
                            <label htmlFor="sort" className="mr-2 text-gray-600">Sắp xếp:</label>
                            <select
                                id="sort"
                                className="border rounded p-2"
                                value={sortOption}
                                onChange={handleSortChange}
                            >
                                <option value="newest">Mới nhất</option>
                                <option value="price-asc">Giá: Thấp đến cao</option>
                                <option value="price-desc">Giá: Cao đến thấp</option>
                                <option value="name-asc">Tên: A-Z</option>
                                <option value="name-desc">Tên: Z-A</option>
                            </select>
                        </div>
                    </div>

                    {/* Products */}
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                    <a href={`/product/${product.id}`} className="block">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-64 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                                            <p className="text-gray-900 font-bold">{product.price.toLocaleString('vi-VN')} ₫</p>
                                            <div className="mt-2 flex items-center space-x-1">
                                                {product.colors.map((color) => (
                                                    <span
                                                        key={color}
                                                        className="inline-block h-4 w-4 rounded-full border border-gray-300"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-xl text-gray-600">Không tìm thấy sản phẩm nào.</p>
                            <p className="mt-2 text-gray-500">Vui lòng thử lại với bộ lọc khác.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;