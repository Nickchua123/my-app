import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../Config/axiosConfig";
import { toast } from "react-toastify";

export default function PaymentResult() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(search);
        const responseCode = params.get("vnp_ResponseCode");
        const txnRef = params.get("vnp_TxnRef");

        if (!txnRef) {
            toast.error("Không tìm thấy mã đơn hàng.");
            return navigate("/checkout");
        }

        // Gọi API lấy thông tin đơn hàng
        api.get(`/orders/${txnRef}`)
            .then((res) => {
                const fetchedOrder = res.data.data;
                setOrder(fetchedOrder);

                // Nếu thanh toán thành công => gọi API callback cập nhật trạng thái
                if (responseCode === "00") {
                    api.post("/orders/payment-callback", {
                        orderId: txnRef,
                        success: true
                    }).then(() => {
                        console.log("✅ Payment status updated via callback");
                        navigate("/order-success");
                    }).catch(() => {
                        toast.warn("Không cập nhật được trạng thái đơn hàng.");
                    });
                }
            })
            .catch(() => {
                toast.success("Đặt hàng thành công");
                navigate("/order-success");
            });

        if (responseCode !== "00") {
            toast.warning("Thanh toán thất bại hoặc bị huỷ.");
        }
    }, []);

    if (!order) return <p className="text-center py-20">Đang tải đơn hàng...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-green-600 mb-4">🎉 Đặt hàng thành công!</h1>
            <p className="mb-6 text-gray-600">
                Cảm ơn bạn, <strong>{order.customerName || order.user?.name}</strong>! Đơn hàng của bạn đã được ghi nhận.
            </p>

            <h2 className="text-lg font-semibold mb-2">Chi tiết đơn hàng</h2>
            <ul className="divide-y border rounded">
                {order.orderItems.map((item, i) => (
                    <li key={i} className="flex justify-between items-center p-3">
                        <span>{item.product?.name} x {item.quantity}</span>
                        <span className="text-orange-600 font-medium">
                            ₫{(item.quantity * item.price).toLocaleString()}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="mt-4 border-t pt-3 text-right font-bold text-lg">
                Tổng tiền: ₫{order.totalAmount.toLocaleString()}
            </div>
        </div>
    );
}
