import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutForm from "../components/CheckoutForm";
import Stepper from "../components/Stepper"; // Bỏ nếu không dùng
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
    const location = useLocation();
    const { cartItems } = useCart();

    // Khi quay lại từ VNPAY bị huỷ => hiển thị thông báo
    useEffect(() => {
        if (location.state?.error) {
            toast.warning(location.state.error);
        }
    }, [location.state]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-orange-600 mb-4">Thanh toán</h1>

            {/* Optional: Hiển thị tiến trình nếu bạn có */}
            <Stepper currentStep={2} />

            {/* Form đặt hàng + Tóm tắt đơn */}
            <CheckoutForm shippingFee={25000} />

            {/* Gợi ý: bạn có thể đặt shippingFee là dynamic hoặc cấu hình */}
        </div>
    );
}
