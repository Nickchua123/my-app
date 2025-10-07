import { useCart } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    Trash2,
    CreditCard,
    ShoppingCart,
    Box,
} from "lucide-react";

export default function CartPage() {
    const { cartItems, setCartItems, removeFromCart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    const selectedIds = location.state?.selectedIds || [];

    const visibleItems =
        selectedIds.length > 0
            ? cartItems.filter((item) => selectedIds.includes(item.id))
            : cartItems;

    const updateQuantity = (id, delta) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const total = visibleItems.reduce(
        (sum, item) => sum + (item.product.price || 0) * item.quantity,
        0
    );

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* ===== Header ===== */}
            <div className="flex items-center gap-3 mb-10">
                <ShoppingCart className="text-black-500 w-8 h-8" />
                <h1 className="text-3xl font-bold text-gray-800">Giỏ hàng của bạn</h1>
            </div>

            {/* ===== Empty cart ===== */}
            {visibleItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
                    <Box className="w-20 h-20 text-gray-300 mb-4" />
                    <p className="text-lg font-medium">Giỏ hàng của bạn đang trống.</p>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 px-6 py-3 bg-black-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
                    >
                        Tiếp tục mua sắm
                    </button>
                </div>
            ) : (
                <>
                    {/* ===== Cart Items ===== */}
                    <div className="space-y-5">
                        {visibleItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col md:flex-row md:items-center gap-5 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                            >
                                <img
                                    src={
                                        item.product.images?.[0]
                                            ? `http://localhost:8080/storage/Product-${item.product.id}/${item.product.images[0]}`
                                            : "/no-image.png"
                                    }
                                    alt={item.product.name}
                                    className="w-28 h-28 object-cover rounded-lg border border-gray-200"
                                />

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                                        {item.product.name}
                                    </h3>
                                    <p className="text-gray-500 mt-1">
                                        Giá:{" "}
                                        <span className="text-black font-semibold">
                                            {item.product.price.toLocaleString()} đ
                                        </span>
                                    </p>

                                    {/* Quantity + remove */}
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex items-center border rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="p-2 hover:bg-gray-100 transition"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>
                                            <span className="px-4 py-1 font-semibold text-gray-700">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="p-2 hover:bg-gray-100 transition"
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium transition"
                                        >
                                            <Trash2 size={16} /> <span>Xoá</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Subtotal */}
                                <div className="text-right min-w-[120px]">
                                    <p className="text-xl font-bold text-black-600">
                                        {(item.product.price * item.quantity).toLocaleString()} đ
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ===== Summary ===== */}
                    <div className="mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <p className="text-lg font-medium text-gray-700">Tổng cộng:</p>
                            <p className="text-3xl font-bold text-black-600 mt-1">
                                {total.toLocaleString()} đ
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/checkout")}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-200"
                        >
                            <CreditCard className="w-5 h-5" /> Tiến hành thanh toán
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
