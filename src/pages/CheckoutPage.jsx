import { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../Config/axiosConfig";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutSummary from "../components/CheckoutSummary";
import Stepper from "../components/Stepper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const { cartItems, clearCart } = useCart();
    const [shippingFee] = useState(25000);
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();

    // Handle form submission (user's shipping info)
    const handleSubmitForm = (data) => {
        setFormData(data);
    };

    // Handle order submission
    const handleOrder = async () => {
        if (!formData) {
            toast.error("❗ Vui lòng nhập thông tin giao hàng!");
            return;
        }
        if (cartItems.length === 0) {
            toast.error("❗ Giỏ hàng đang trống!");
            return;
        }

        try {
            const payload = {
                customer: {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    address: formData.address,
                },
                items: cartItems.map((item) => ({
                    productId: item.product.id,
                    productName: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price,
                    imageUrl: item.product.images?.[0] || null,
                })),
                shippingFee: shippingFee,
                shippingMethod: "standard"
            };

            // 🛒 Send order data to backend
            const res = await api.post("/orders/create-payment", payload);

            if (res.data && res.data.success) {
                toast.success("🎉 Đặt hàng thành công!");
                clearCart();
                navigate("/order-success");
            } else {
                toast.error("⚠️ Có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Đặt hàng lỗi:", error);
            toast.error("❌ Đặt hàng thất bại, thử lại sau.");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4">
            <div className="container mx-auto max-w-6xl">
                <Stepper currentStep={2} />

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {/* Form bên trái chiếm 2/3 */}
                    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <CheckoutForm onSubmit={handleSubmitForm} />
                    </div>

                    {/* Đơn hàng bên phải */}
                    <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                        <CheckoutSummary
                            cartItems={cartItems}
                            shippingFee={shippingFee}
                            onOrder={handleOrder}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}
