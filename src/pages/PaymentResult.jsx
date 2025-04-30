import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Config/axiosConfig";
import { toast } from "react-toastify";

export default function PaymentResult() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const handlePaymentResult = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const txnRef = urlParams.get('vnp_TxnRef');
            const responseCode = urlParams.get('vnp_ResponseCode');
            const secureHash = urlParams.get('vnp_SecureHash');

            if (!txnRef || !responseCode || !secureHash) {
                setStatus("error");
                return;
            }

            try {
                // Gửi callback về backend để xác nhận giao dịch
                await api.post("/orders/payment-callback", {
                    orderId: txnRef,
                    success: responseCode === "00"  // thành công nếu responseCode = 00
                });

                if (responseCode === "00") {
                    setStatus("success");
                } else {
                    setStatus("failed");
                }
            } catch (error) {
                console.error(error);
                setStatus("error");
            }
        };

        handlePaymentResult();
    }, [navigate]);

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            {status === "loading" && (
                <div className="text-gray-600 text-lg">Đang xác nhận giao dịch...</div>
            )}
            {status === "success" && (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Thanh toán thành công! 🎉</h2>
                    <button
                        onClick={handleGoHome}
                        className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                    >
                        Về trang chủ
                    </button>
                </div>
            )}
            {status === "failed" && (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Thanh toán thất bại. 😥</h2>
                    <button
                        onClick={handleGoHome}
                        className="mt-4 bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700"
                    >
                        Về trang chủ
                    </button>
                </div>
            )}
            {status === "error" && (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-yellow-600 mb-4">Lỗi xác nhận giao dịch. 😓</h2>
                    <button
                        onClick={handleGoHome}
                        className="mt-4 bg-yellow-600 text-white py-2 px-6 rounded-lg hover:bg-yellow-700"
                    >
                        Về trang chủ
                    </button>
                </div>
            )}
        </div>
    );
}
