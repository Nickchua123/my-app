import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../Config/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
    Truck,
    CreditCard,
    User,
    Phone,
    Mail,
    MapPin,
    ShoppingCart,
    Wallet,
    HandCoins,
} from "lucide-react";

export default function CheckoutForm() {
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        note: "",
        paymentMethod: "cod",
        shippingMethod: "standard",
    });

    const [errors, setErrors] = useState({});

    // 🚚 Shipping cost
    const shippingFee =
        form.shippingMethod === "express"
            ? 50000
            : form.shippingMethod === "super-express"
                ? 100000
                : 25000;

    const validate = () => {
        const err = {};
        if (!form.name.trim()) err.name = "Vui lòng nhập tên";
        if (!form.phone.trim()) err.phone = "Vui lòng nhập số điện thoại";
        if (!form.email.trim()) err.email = "Vui lòng nhập email";
        if (!form.address.trim()) err.address = "Vui lòng nhập địa chỉ nhận hàng";
        return err;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate();
        setErrors(err);
        if (Object.keys(err).length > 0) return;

        if (cartItems.length === 0) {
            toast.error("Giỏ hàng đang trống!");
            return;
        }

        try {
            const payload = {
                customerName: form.name,
                customerPhone: form.phone,
                customerEmail: form.email,
                customerAddress: form.address,
                items: cartItems.map((item) => ({
                    productId: item.product.id,
                    productName: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price,
                    imageUrl: item.product.images?.[0] || null,
                })),
                shippingFee,
                shippingMethod: form.shippingMethod,
                paymentMethod: form.paymentMethod,
            };

            const res = await api.post("/orders/create-payment", payload);

            if (res.data?.data?.paymentUrl) {
                if (form.paymentMethod === "vnpay") {
                    localStorage.setItem("checkoutForm", JSON.stringify(form));
                    localStorage.setItem("checkoutCart", JSON.stringify(cartItems));
                    window.location.href = res.data.data.paymentUrl;
                } else {
                    toast.success("Đặt hàng COD thành công!");
                    clearCart();
                    navigate("/order-success");
                }
            } else {
                toast.error("Có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (err) {
            toast.error("Đặt hàng thất bại!");
        }
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const total = subtotal + shippingFee;

    return (
        <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-3 gap-6 mt-8 text-black"
        >
            {/* === Form thông tin + thanh toán (2 cột) === */}
            <div className="md:col-span-2 bg-white p-6 rounded-xl shadow border border-gray-100">
                <h2 className="text-2xl font-bold mb-5 text-black-600 flex items-center gap-2">
                    <User className="w-6 h-6 text-black-600" /> Thông tin thanh toán
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                    {/* ====== Cột trái ====== */}
                    <div className="space-y-4">
                        {[
                            { name: "name", label: "Họ và tên", icon: <User /> },
                            { name: "phone", label: "Số điện thoại", icon: <Phone /> },
                            { name: "email", label: "Email", icon: <Mail /> },
                            { name: "address", label: "Địa chỉ nhận hàng", icon: <MapPin /> },
                        ].map((field) => (
                            <div key={field.name}>
                                <label className="block font-semibold mb-1">
                                    {field.label}
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-lg px-3">
                                    <span className="text-gray-400">{field.icon}</span>
                                    <input
                                        type={field.name === "email" ? "email" : "text"}
                                        name={field.name}
                                        value={form[field.name]}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 outline-none bg-transparent"
                                    />
                                </div>
                                {errors[field.name] && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors[field.name]}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Ghi chú */}
                        <div>
                            <label className="block font-semibold mb-1">
                                Ghi chú (tuỳ chọn)
                            </label>
                            <textarea
                                name="note"
                                value={form.note}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-4 py-2"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* ====== Cột phải ====== */}
                    <div className="space-y-5">
                        <div>
                            <label className="block font-semibold mb-1 flex items-center gap-2">
                                <Truck className="w-5 h-5 text-black-600" /> Phương thức giao hàng
                            </label>
                            <select
                                name="shippingMethod"
                                value={form.shippingMethod}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-4 py-2"
                            >
                                <option value="standard">Tiêu chuẩn (₫25,000)</option>
                                <option value="express">Nhanh (₫50,000)</option>
                                <option value="super-express">Hoả tốc (₫100,000)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-semibold mb-2 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-black-600" /> Phương thức
                                thanh toán
                            </label>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:border-blue-600 transition">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={form.paymentMethod === "cod"}
                                        onChange={handleChange}
                                        className="accent-black-600"
                                    />
                                    <HandCoins className="w-5 h-5 text-black-600" />
                                    <span>Thanh toán khi nhận hàng (COD)</span>
                                </label>

                                <label className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:border-blue-600 transition">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="vnpay"
                                        checked={form.paymentMethod === "vnpay"}
                                        onChange={handleChange}
                                        className="accent-black-600"
                                    />
                                    <Wallet className="w-5 h-5 text-black-600" />
                                    <span>Thanh toán qua VNPAY</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* === Tóm tắt đơn hàng === */}
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 h-fit">
                <h2 className="text-2xl font-bold text-black-600 mb-4 flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6 text-black-600" /> Đơn hàng của bạn
                </h2>

                <ul className="divide-y mb-4">
                    {cartItems.length === 0 ? (
                        <li className="py-4 text-gray-500 text-center">
                            Không có sản phẩm nào trong giỏ.
                        </li>
                    ) : (
                        cartItems.map((item) => (
                            <li key={item.id} className="flex items-center gap-3 py-3 text-sm">
                                <img
                                    src={
                                        item.product.images?.[0]
                                            ? `http://localhost:8080/storage/Product-${item.product.id}/${item.product.images[0]}`
                                            : "/no-image.png"
                                    }
                                    alt={item.product.name}
                                    className="w-12 h-12 object-cover rounded border"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="truncate font-medium text-black">
                                        {item.product.name}
                                    </div>
                                    <div className="text-gray-500">Số lượng: {item.quantity}</div>
                                </div>
                                <div className="text-black-600 font-bold whitespace-nowrap">
                                    ₫{(item.product.price * item.quantity).toLocaleString()}
                                </div>
                            </li>
                        ))
                    )}
                </ul>

                <div className="space-y-2 text-base">
                    <div className="flex justify-between">
                        <span>Tạm tính:</span>
                        <span className="font-medium">₫{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Phí vận chuyển:</span>
                        <span className="font-medium">₫{shippingFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold mt-2 border-t pt-3">
                        <span>Tổng thanh toán:</span>
                        <span className="text-green-600">₫{total.toLocaleString()}</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full bg-blue-600 text-white font-semibold rounded-lg py-3 hover:bg-blue-700 transition text-lg"
                >
                    Đặt hàng ngay
                </button>
            </div>
        </form>
    );
}
