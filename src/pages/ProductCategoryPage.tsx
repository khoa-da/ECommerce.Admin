import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Product } from '../types/product';

// Mock API call - in a real app, this would fetch from your backend
const fetchProducts = async (category?: string): Promise<Product[]> => {
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

    if (category) {
        return mockProducts.filter(p => p.category === category);
    }

    return mockProducts;
};

// Filter options type
type FilterOptions = {
    priceRange: {
        min: number;
        max: number;
    };
    colors: string[];
    sizes: string[];
    inStock: boolean;
};

const ProductCategoryPage: React.FC = () => {
    const { category } = useParams<{ category?: string }>();
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState('recommended');

    // Available filter options
    const [availableColors, setAvailableColors] = useState<string[]>([]);
    const [availableSizes, setAvailableSizes] = useState<string[]>([]);

    // Applied filters
    const [filters, setFilters] = useState<FilterOptions>({
        priceRange: { min: 0, max: 1000000 },
        colors: [],
        sizes: [],
        inStock: false
    });

    // Mobile filter drawer state
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Color names mapping
    const colorNames: { [key: string]: string } = {
        '#000000': 'Đen',
        '#FFFFFF': 'Trắng',
        '#0000FF': 'Xanh dương',
        '#FF0000': 'Đỏ',
        '#FFC0CB': 'Hồng',
        '#808080': 'Xám',
        '#87CEEB': 'Xanh da trời',
        '#F5F5DC': 'Be',
        '#000080': 'Xanh đen',
        '#4B0082': 'Indigo',
        '#FF69B4': 'Hồng đậm',
        '#00FFFF': 'Xanh ngọc'
    };

    // Category names mapping
    const categoryNames: { [key: string]: string } = {
        'men': 'Nam',
        'women': 'Nữ',
        'accessories': 'Phụ kiện',
        'shoes': 'Giày'
    };

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts(category);
                setProducts(data);
                setFilteredProducts(data);

                // Extract available colors and sizes from products
                const colors = Array.from(new Set(data.flatMap(p => p.colors)));
                const sizes = Array.from(new Set(data.flatMap(p => p.sizes)));

                setAvailableColors(colors);
                setAvailableSizes(sizes);

                // Initialize price range based on products
                const maxPrice = Math.max(...data.map(p => p.price));
                setFilters(prev => ({
                    ...prev,
                    priceRange: { min: 0, max: maxPrice }
                }));
            } catch (err) {
                setError('Không thể tải danh sách sản phẩm');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [category]);

    // Apply filters and sorting
    useEffect(() => {
        let result = [...products];

        // Apply filters
        if (filters.colors.length > 0) {
            result = result.filter(product =>
                product.colors.some(color => filters.colors.includes(color))
            );
        }

        if (filters.sizes.length > 0) {
            result = result.filter(product =>
                product.sizes.some(size => filters.sizes.includes(size))
            );
        }

        if (filters.inStock) {
            result = result.filter(product => product.inStock);
        }

        result = result.filter(product =>
            product.price >= filters.priceRange.min &&
            product.price <= filters.priceRange.max
        );

        // Apply sorting
        switch (sortOption) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                // Default sorting (recommended)
                break;
        }

        setFilteredProducts(result);
    }, [products, filters, sortOption]);

    // Handle filter changes
    const handleColorFilter = (color: string) => {
        setFilters(prev => {
            const newColors = prev.colors.includes(color)
                ? prev.colors.filter(c => c !== color)
                : [...prev.colors, color];

            return { ...prev, colors: newColors };
        });
    };

    const handleSizeFilter = (size: string) => {
        setFilters(prev => {
            const newSizes = prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size];

            return { ...prev, sizes: newSizes };
        });
    };

    const handleInStockFilter = (checked: boolean) => {
        setFilters(prev => ({ ...prev, inStock: checked }));
    };

    const handlePriceRangeChange = (min: number, max: number) => {
        setFilters(prev => ({ ...prev, priceRange: { min, max } }));
    };

    const handleSortChange = (option: string) => {
        setSortOption(option);
    };

    const resetFilters = () => {
        setFilters({
            priceRange: { min: 0, max: Math.max(...products.map(p => p.price)) },
            colors: [],
            sizes: [],
            inStock: false
        });
        setSortOption('recommended');
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Lỗi khi tải sản phẩm</h1>
                <p className="mb-6">{error}</p>
                <Link to="/" className="inline-block px-6 py-3 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors">
                    Quay về trang chủ
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="mb-6">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-gray-600 hover:text-gray-900">
                                Trang chủ
                            </Link>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <span className="ml-1 text-gray-500 md:ml-2 capitalize">
                                    {category ? categoryNames[category] || category : 'Tất cả sản phẩm'}
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Page header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    {category ? categoryNames[category] || category : 'Tất cả sản phẩm'}
                </h1>
                <p className="mt-2 text-gray-600">
                    {filteredProducts.length} sản phẩm
                </p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Mobile filter dialog */}
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${showMobileFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setShowMobileFilters(false)}>
                    <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-50 overflow-y-auto p-6"
                        onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Bộ lọc</h2>
                            <button
                                className="text-gray-500 hover:text-gray-900"
                                onClick={() => setShowMobileFilters(false)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile filters content */}
                        <div className="space-y-6">
                            {/* Price Range */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Giá</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label htmlFor="min-price-mobile" className="sr-only">Giá từ</label>
                                        <input
                                            type="number"
                                            id="min-price-mobile"
                                            placeholder="Từ"
                                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                            value={filters.priceRange.min}
                                            onChange={(e) => handlePriceRangeChange(parseInt(e.target.value) || 0, filters.priceRange.max)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="max-price-mobile" className="sr-only">Giá đến</label>
                                        <input
                                            type="number"
                                            id="max-price-mobile"
                                            placeholder="Đến"
                                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                            value={filters.priceRange.max}
                                            onChange={(e) => handlePriceRangeChange(filters.priceRange.min, parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Colors */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Màu sắc</h3>
                                <div className="flex flex-wrap gap-2">
                                    {availableColors.map((color) => (
                                        <button
                                            key={color}
                                            className={`h-8 w-8 rounded-full border ${filters.colors.includes(color) ? 'ring-2 ring-offset-2 ring-gray-900' : 'border-gray-300'} focus:outline-none`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleColorFilter(color)}
                                            title={colorNames[color] || color}
                                        >
                                            <span className="sr-only">{colorNames[color] || color}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Kích thước</h3>
                                <div className="flex flex-wrap gap-2">
                                    {availableSizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`px-3 py-1 border ${filters.sizes.includes(size) ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'} rounded-md focus:outline-none`}
                                            onClick={() => handleSizeFilter(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* In Stock */}
                            <div className="flex items-center">
                                <input
                                    id="in-stock-mobile"
                                    type="checkbox"
                                    className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                                    checked={filters.inStock}
                                    onChange={(e) => handleInStockFilter(e.target.checked)}
                                />
                                <label htmlFor="in-stock-mobile" className="ml-2 text-sm text-gray-900">
                                    Chỉ hiển thị sản phẩm còn hàng
                                </label>
                            </div>

                            {/* Mobile filter actions */}
                            <div className="pt-4 border-t border-gray-200 flex space-x-3">
                                <button
                                    className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                                    onClick={() => setShowMobileFilters(false)}
                                >
                                    Áp dụng
                                </button>
                                <button
                                    className="flex-1 bg-gray-100 text-gray-900 py-2 px-4 rounded-md font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                                    onClick={resetFilters}
                                >
                                    Đặt lại
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop sidebar filters */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-20">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-900">Bộ lọc</h2>
                                <button
                                    className="text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
                                    onClick={resetFilters}
                                >
                                    Đặt lại
                                </button>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Giá (VNĐ)</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label htmlFor="min-price" className="sr-only">Giá từ</label>
                                        <input
                                            type="number"
                                            id="min-price"
                                            placeholder="Từ"
                                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                                            value={filters.priceRange.min}
                                            onChange={(e) => handlePriceRangeChange(parseInt(e.target.value) || 0, filters.priceRange.max)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="max-price" className="sr-only">Giá đến</label>
                                        <input
                                            type="number"
                                            id="max-price"
                                            placeholder="Đến"
                                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                                            value={filters.priceRange.max}
                                            onChange={(e) => handlePriceRangeChange(filters.priceRange.min, parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Colors */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Màu sắc</h3>
                                <div className="flex flex-wrap gap-2">
                                    {availableColors.map((color) => (
                                        <button
                                            key={color}
                                            className={`h-8 w-8 rounded-full border ${filters.colors.includes(color) ? 'ring-2 ring-offset-2 ring-gray-900' : 'border-gray-300'} focus:outline-none`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleColorFilter(color)}
                                            title={colorNames[color] || color}
                                        >
                                            <span className="sr-only">{colorNames[color] || color}</span>
                                            {filters.colors.includes(color) && (
                                                <svg className="h-3 w-3 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-2">
                                    {filters.colors.length > 0 && (
                                        <div className="flex flex-wrap text-xs text-gray-600 mt-1">
                                            {filters.colors.map(color => (
                                                <span key={color} className="mr-2">
                                                    {colorNames[color] || color}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Kích thước</h3>
                                <div className="flex flex-wrap gap-2">
                                    {availableSizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`px-3 py-1 border ${filters.sizes.includes(size) ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'} rounded-md focus:outline-none text-sm`}
                                            onClick={() => handleSizeFilter(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* In Stock */}
                            <div className="flex items-center">
                                <input
                                    id="in-stock"
                                    type="checkbox"
                                    className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                                    checked={filters.inStock}
                                    onChange={(e) => handleInStockFilter(e.target.checked)}
                                />
                                <label htmlFor="in-stock" className="ml-2 text-sm text-gray-900">
                                    Chỉ hiển thị sản phẩm còn hàng
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product grid */}
                <div className="flex-1">
                    {/* Mobile filter and sort buttons */}
                    <div className="lg:hidden flex justify-between items-center mb-6">
                        <button
                            className="flex items-center text-sm font-medium text-gray-900 bg-white p-2 border border-gray-300 rounded-md"
                            onClick={() => setShowMobileFilters(true)}
                        >
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            Lọc
                        </button>

                        <div className="relative">
                            <label htmlFor="mobile-sort" className="sr-only">Sắp xếp</label>
                            <select
                                id="mobile-sort"
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm rounded-md"
                                value={sortOption}
                                onChange={(e) => handleSortChange(e.target.value)}
                            >
                                <option value="recommended">Khuyến nghị</option>
                                <option value="price-asc">Giá: Thấp đến cao</option>
                                <option value="price-desc">Giá: Cao đến thấp</option>
                                <option value="name-asc">Tên: A-Z</option>
                                <option value="name-desc">Tên: Z-A</option>
                            </select>
                        </div>
                    </div>

                    {/* Desktop sort */}
                    <div className="hidden lg:flex justify-between items-center mb-6">
                        <p className="text-sm text-gray-600">Hiển thị {filteredProducts.length} sản phẩm</p>

                        <div className="flex items-center">
                            <span className="text-sm text-gray-600 mr-2">Sắp xếp:</span>
                            <div className="relative">
                                <label htmlFor="desktop-sort" className="sr-only">Sắp xếp</label>
                                <select
                                    id="desktop-sort"
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm rounded-md"
                                    value={sortOption}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                >
                                    <option value="recommended">Khuyến nghị</option>
                                    <option value="price-asc">Giá: Thấp đến cao</option>
                                    <option value="price-desc">Giá: Cao đến thấp</option>
                                    <option value="name-asc">Tên: A-Z</option>
                                    <option value="name-desc">Tên: Z-A</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Product grid */}
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy sản phẩm nào</h3>
                            <p className="text-gray-600 mb-6">Thử thay đổi bộ lọc hoặc tìm kiếm của bạn</p>
                            <button
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                onClick={resetFilters}
                            >
                                Đặt lại bộ lọc
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="group">
                                    <Link to={`/product/${product.id}`} className="block bg-gray-100 rounded-lg overflow-hidden">
                                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                            <p className="mt-1 text-sm text-gray-500">{product.price.toLocaleString('vi-VN')} đ</p>

                                            {/* Color options */}
                                            <div className="mt-2 flex space-x-1">
                                                {product.colors.map(color => (
                                                    <div
                                                        key={color}
                                                        className="h-4 w-4 rounded-full border border-gray-300"
                                                        style={{ backgroundColor: color }}
                                                        title={colorNames[color] || color}
                                                    ></div>
                                                ))}
                                            </div>

                                            {/* Size options */}
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {product.sizes.map(size => (
                                                    <span key={size} className="inline-block px-2 py-1 text-xs border border-gray-200 rounded">
                                                        {size}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination placeholder - would implement for real API */}
                    {filteredProducts.length > 0 && (
                        <div className="mt-8 flex justify-center">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Trang trước</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    aria-current="page"
                                    className="z-10 bg-gray-900 border-gray-900 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                    1
                                </a>
                                <a
                                    href="#"
                                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                    2
                                </a>
                                <a
                                    href="#"
                                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                    3
                                </a>
                                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                    ...
                                </span>
                                <a
                                    href="#"
                                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                    8
                                </a>
                                <a
                                    href="#"
                                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                    9
                                </a>
                                <a
                                    href="#"
                                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                    10
                                </a>
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Trang tiếp</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCategoryPage;