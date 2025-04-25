import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>
                <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="text-xl mb-4">Giỏ hàng của bạn đang trống</p>
                    <p className="text-gray-600 mb-6">Thêm sản phẩm vào giỏ hàng để tiến hành thanh toán</p>
                    <Link to="/products" className="inline-block px-6 py-3 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors">
                        Tiếp tục mua sắm
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cart.map((item, index) => (
                                    <tr key={`${item.product.id}-${item.size}-${item.color}-${index}`}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-16 w-16 bg-gray-100">
                                                    <img
                                                        src={item.product.imageUrl}
                                                        alt={item.product.name}
                                                        className="h-16 w-16 object-cover"
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.product.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Kích thước: {item.size}
                                                    </div>
                                                    <div className="text-sm text-gray-500 flex items-center">
                                                        Màu:
                                                        <span
                                                            className="inline-block h-4 w-4 rounded-full ml-1 border border-gray-300"
                                                            style={{ backgroundColor: item.color }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{item.product.price.toLocaleString('vi-VN')} ₫</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center border rounded w-24">
                                                <button
                                                    className="px-2 py-1 text-gray-600 hover:text-gray-900"
                                                    onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className="flex-1 text-center">{item.quantity}</span>
                                                <button
                                                    className="px-2 py-1 text-gray-600 hover:text-gray-900"
                                                    onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {(item.product.price * item.quantity).toLocaleString('vi-VN')} ₫
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                className="text-red-600 hover:text-red-800"
                                                onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex justify-between">
                        <Link to="/products" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Tổng đơn hàng</h2>

                        <div className="border-t border-gray-200 py-4">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Tạm tính</span>
                                <span className="text-gray-900 font-medium">{totalPrice.toLocaleString('vi-VN')} ₫</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Phí vận chuyển</span>
                                <span className="text-gray-900 font-medium">30.000 ₫</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between mb-4">
                                <span className="text-lg font-medium text-gray-900">Tổng cộng</span>
                                <span className="text-lg font-bold text-gray-900">{(totalPrice + 30000).toLocaleString('vi-VN')} ₫</span>
                            </div>

                            <Link
                                to="/checkout"
                                className="w-full bg-gray-900 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 flex items-center justify-center"
                            >
                                Tiến hành thanh toán
                            </Link>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span className="text-sm text-gray-600">Thanh toán an toàn</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                <span className="text-sm text-gray-600">Nhiều phương thức thanh toán</span>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span className="text-sm text-gray-600">Đổi trả trong 30 ngày</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;