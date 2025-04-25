import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CheckoutPage: React.FC = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        ward: '',
        paymentMethod: 'cod'
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when field is edited
        if (formErrors[name]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };
    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.fullName.trim()) errors.fullName = 'Vui lòng nhập họ tên';
        if (!formData.email.trim()) errors.email = 'Vui lòng nhập email';
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Email không hợp lệ';

        if (!formData.phone.trim()) errors.phone = 'Vui lòng nhập số điện thoại';
        else if (!/^[0-9]{10}$/.test(formData.phone)) errors.phone = 'Số điện thoại không hợp lệ';

        if (!formData.address.trim()) errors.address = 'Vui lòng nhập địa chỉ';
        if (!formData.city.trim()) errors.city = 'Vui lòng chọn thành phố';
        if (!formData.district.trim()) errors.district = 'Vui lòng chọn quận/huyện';
        if (!formData.ward.trim()) errors.ward = 'Vui lòng chọn phường/xã';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Normally here you would send the order to your backend API
        // For this example, we'll just simulate a successful order

        // Simulate API call
        setTimeout(() => {
            // Clear the cart after successful order
            clearCart();

            // Redirect to order confirmation page
            navigate('/order-confirmation', {
                state: {
                    orderNumber: Math.floor(100000 + Math.random() * 900000),
                    orderDetails: {
                        items: cart,
                        shipping: 30000,
                        total: totalPrice + 30000,
                        customerInfo: formData
                    }
                }
            });
        }, 1500);
    };

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Thanh toán</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Customer Information Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Thông tin giao hàng</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Họ và tên *
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-md ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {formErrors.fullName && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-md ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {formErrors.email && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Số điện thoại *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full p-2 border rounded-md ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {formErrors.phone && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Địa chỉ *
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={`w-full p-2 border rounded-md ${formErrors.address ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {formErrors.address && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                        Tỉnh/Thành phố *
                                    </label>
                                    <select
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-md ${formErrors.city ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">-- Chọn Tỉnh/TP --</option>
                                        <option value="hanoi">Hà Nội</option>
                                        <option value="hochiminh">TP. Hồ Chí Minh</option>
                                        <option value="danang">Đà Nẵng</option>
                                        {/* Add more cities */}
                                    </select>
                                    {formErrors.city && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                                        Quận/Huyện *
                                    </label>
                                    <select
                                        id="district"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-md ${formErrors.district ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">-- Chọn Quận/Huyện --</option>
                                        {/* Dynamic options based on selected city */}
                                        {formData.city === 'hanoi' && (
                                            <>
                                                <option value="caugiay">Cầu Giấy</option>
                                                <option value="hoankiem">Hoàn Kiếm</option>
                                                <option value="dongda">Đống Đa</option>
                                            </>
                                        )}
                                        {formData.city === 'hochiminh' && (
                                            <>
                                                <option value="district1">Quận 1</option>
                                                <option value="district2">Quận 2</option>
                                                <option value="district3">Quận 3</option>
                                            </>
                                        )}
                                    </select>
                                    {formErrors.district && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.district}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phường/Xã *
                                    </label>
                                    <select
                                        id="ward"
                                        name="ward"
                                        value={formData.ward}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-md ${formErrors.ward ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">-- Chọn Phường/Xã --</option>

                                        <option value="caugiay">Cầu Giấy</option>
                                        <option value="hoankiem">Hoàn Kiếm</option>
                                        <option value="dongda">Đống Đa</option>

                                        {formData.city === 'district2' && (
                                            <>
                                                <option value="district1">Quận 1</option>
                                                <option value="district2">Quận 2</option>
                                                <option value="district3">Quận 3</option>
                                            </>
                                        )}
                                    </select>
                                    {formErrors.ward && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.ward}</p>
                                    )}
                                </div>
                            </div>

                            <h2 className="text-lg font-medium text-gray-900 mb-4">Phương thức thanh toán</h2>

                            <div className="mb-6">
                                <div className="flex items-center mb-3">
                                    <input
                                        id="cod"
                                        name="paymentMethod"
                                        type="radio"
                                        value="cod"
                                        checked={formData.paymentMethod === 'cod'}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300"
                                    />
                                    <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                                        Thanh toán khi nhận hàng (COD)
                                    </label>
                                </div>

                                <div className="flex items-center mb-3">
                                    <input
                                        id="bankTransfer"
                                        name="paymentMethod"
                                        type="radio"
                                        value="bankTransfer"
                                        checked={formData.paymentMethod === 'bankTransfer'}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300"
                                    />
                                    <label htmlFor="bankTransfer" className="ml-3 block text-sm font-medium text-gray-700">
                                        Chuyển khoản ngân hàng
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="creditCard"
                                        name="paymentMethod"
                                        type="radio"
                                        value="creditCard"
                                        checked={formData.paymentMethod === 'creditCard'}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300"
                                    />
                                    <label htmlFor="creditCard" className="ml-3 block text-sm font-medium text-gray-700">
                                        Thẻ tín dụng / Ghi nợ
                                    </label>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full bg-gray-900 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800"
                                >
                                    Đặt hàng
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Đơn hàng của bạn</h2>

                        <div className="border-t border-gray-200 py-4">
                            {cart.map((item, index) => (
                                <div key={`${item.product.id}-${item.size}-${item.color}-${index}`} className="flex justify-between py-2">
                                    <div className="flex items-start">
                                        <span className="text-gray-700 font-medium mr-2">{item.quantity}x</span>
                                        <div>
                                            <p className="text-gray-900">{item.product.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Size: {item.size}, Màu:
                                                <span
                                                    className="inline-block h-3 w-3 rounded-full ml-1 border border-gray-300"
                                                    style={{ backgroundColor: item.color }}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-gray-900">
                                        {(item.product.price * item.quantity).toLocaleString('vi-VN')} ₫
                                    </span>
                                </div>
                            ))}
                        </div>

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
                        </div>

                        <div className="mt-6">
                            <Link to="/cart" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Quay lại giỏ hàng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;