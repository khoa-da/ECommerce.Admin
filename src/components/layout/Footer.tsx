import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Fashion Store</h3>
                        <p className="text-gray-400">
                            Cung cấp các sản phẩm thời trang chất lượng cao với giá cả hợp lý.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/products/men" className="hover:text-white">Nam</Link></li>
                            <li><Link to="/products/women" className="hover:text-white">Nữ</Link></li>
                            <li><Link to="/products/accessories" className="hover:text-white">Phụ kiện</Link></li>
                            <li><Link to="/products/sale" className="hover:text-white">Khuyến mãi</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Thông tin</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/about" className="hover:text-white">Về chúng tôi</Link></li>
                            <li><Link to="/contact" className="hover:text-white">Liên hệ</Link></li>
                            <li><Link to="/policy" className="hover:text-white">Chính sách</Link></li>
                            <li><Link to="/terms" className="hover:text-white">Điều khoản</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</li>
                            <li>Email: info@fashion-store.com</li>
                            <li>Điện thoại: +84 123 456 789</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} Fashion Store. Tất cả quyền được bảo lưu.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;