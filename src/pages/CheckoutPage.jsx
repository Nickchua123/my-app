import { useCart } from "../context/CartContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";

export default function CheckoutPage() {
    const { cartItems, setCartItems } = useCart();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const total = cartItems?.reduce(
        (sum, item) => sum + (item.product.price || 0) * (item.quantity || 0), 0
    );

    // Gửi đơn hàng (ví dụ, sau này sửa thành gọi API thực tế)
    const handleOrder = async () => {
        if (!name || !phone || !address) {
            toast.error("Vui lòng nhập đầy đủ thông tin giao hàng!");
            return;
        }
        setLoading(true);
        // TODO: Gửi thông tin lên backend
        setTimeout(() => {
            setLoading(false);
            toast.success("Đặt hàng thành công! 🎉");
            setCartItems([]); // Xóa giỏ hàng FE (tùy backend mà có gọi API xóa không)
            navigate("/"); // Quay về trang chủ, hoặc chuyển sang trang cảm ơn
        }, 1200);
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-xl shadow text-center text-gray-500">
                <FiShoppingCart className="mx-auto text-5xl mb-3 text-orange-300" />
                <div className="text-lg">Giỏ hàng trống.</div>
                <button
                    onClick={() => navigate("/")}
                    className="mt-5 py-2 px-5 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                >
                    <FiArrowLeft className="inline-block mr-2" />
                    Về trang chủ
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-12 mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-8">
            {/* Cột trái: Thông tin giao hàng */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-orange-500">Thông tin giao hàng</h2>
                <form
                    className="space-y-4"
                    onSubmit={e => {
                        e.preventDefault();
                        handleOrder();
                    }}
                >
                    <div>
                        <label className="block font-semibold mb-1">Họ tên người nhận *</label>
                        <input
                            type="text"
                            className="w-full border rounded px-4 py-2 focus:outline-orange-500"
                            placeholder="Nhập họ tên"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Số điện thoại *</label>
                        <input
                            type="tel"
                            className="w-full border rounded px-4 py-2 focus:outline-orange-500"
                            placeholder="Nhập số điện thoại"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Địa chỉ giao hàng *</label>
                        <input
                            type="text"
                            className="w-full border rounded px-4 py-2 focus:outline-orange-500"
                            placeholder="Ví dụ: 92 Nguyễn Lương Bằng, Đống Đa, Hà Nội"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Ghi chú (tuỳ chọn)</label>
                        <textarea
                            className="w-full border rounded px-4 py-2 focus:outline-orange-500"
                            placeholder="Ghi chú cho cửa hàng..."
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            rows={2}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold shadow hover:opacity-90 transition flex justify-center items-center"
                        disabled={loading}
                    >
                        {loading ? "Đang xử lý..." : "Đặt hàng ngay"}
                    </button>
                </form>
            </div>

            {/* Cột phải: Tóm tắt đơn hàng */}
            <div className="border-l pl-6">
                <h2 className="text-2xl font-bold mb-6 text-orange-500">Đơn hàng của bạn</h2>
                <ul className="divide-y max-h-60 overflow-y-auto">
                    {cartItems.map(item => (
                        <li key={item.id} className="flex items-center gap-3 py-3">
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
                                <div className="font-medium truncate">{item.product.name}</div>
                                <div className="text-gray-600 text-sm">
                                    Số lượng: <span className="font-semibold">{item.quantity}</span>
                                </div>
                            </div>
                            <div className="font-semibold text-orange-600">
                                ₫{(item.product.price * item.quantity).toLocaleString()}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between items-center mt-8 pt-4 border-t">
                    <span className="font-semibold">Tổng cộng:</span>
                    <span className="font-bold text-green-600 text-xl">
                        ₫{total.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
