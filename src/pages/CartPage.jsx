import { useCart } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiTrash2, FiCreditCard } from "react-icons/fi";

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
        <div className="max-w-6xl mx-auto px-6 py-10 min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-orange-600 mb-10 flex items-center gap-3">
                🛒 Giỏ hàng đã chọn
            </h1>

            {visibleItems.length === 0 ? (
                <div className="text-center mt-20 text-gray-500 text-xl">
                    Bạn chưa chọn sản phẩm nào để thanh toán.
                </div>
            ) : (
                <>
                    <div className="space-y-5">
                        {visibleItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 items-center p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
                            >
                                <img
                                    src={
                                        item.product.images?.[0]
                                            ? `http://localhost:8080/storage/Product-${item.product.id}/${item.product.images[0]}`
                                            : "/no-image.png"
                                    }
                                    alt={item.product.name}
                                    className="w-24 h-24 object-cover rounded border"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                                        {item.product.name}
                                    </h3>
                                    <div className="flex items-center mt-2 gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="border px-2 py-1 rounded hover:bg-orange-100"
                                        >
                                            <FiChevronLeft />
                                        </button>
                                        <span className="font-semibold text-gray-700">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="border px-2 py-1 rounded hover:bg-orange-100"
                                        >
                                            <FiChevronRight />
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="ml-3 text-red-500 hover:text-red-700"
                                            title="Xoá khỏi giỏ"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right text-orange-600 font-bold text-lg min-w-[100px]">
                                    {(item.product.price * item.quantity).toLocaleString()} đ
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100 flex justify-between items-center">
                        <div>
                            <p className="text-lg font-medium text-gray-700">Tổng cộng:</p>
                            <p className="text-3xl font-bold text-green-600">
                                {total.toLocaleString()} đ
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/checkout")}
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:brightness-110 transition"
                        >
                            <FiCreditCard className="text-2xl" /> Tiến hành thanh toán
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
