import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/" className="text-2xl font-bold text-gray-800">Fashion Store</Link>
                </div>
                <nav className="hidden md:flex space-x-8">
                    <Link to="/" className="text-gray-600 hover:text-gray-900">Trang chủ</Link>
                    <Link to="/products" className="text-gray-600 hover:text-gray-900">Sản phẩm</Link>
                    <Link to="/categories" className="text-gray-600 hover:text-gray-900">Danh mục</Link>
                    <Link to="/contact" className="text-gray-600 hover:text-gray-900">Liên hệ</Link>
                </nav>
                <div className="flex items-center space-x-4">
                    <Link to="/search" className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </Link>
                    <Link to="/cart" className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </Link>
                    <Link to="/login" className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    );
};
export default Header;