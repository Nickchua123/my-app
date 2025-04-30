import React from "react";

export default function CheckoutSummary({ cartItems = [], shippingFee = 25000, onOrder }) {
    // Tính tổng giá sản phẩm
    const subtotal = cartItems.reduce(
        (sum, item) => sum + (item.product.price || 0) * (item.quantity || 0), 0
    );
    const total = subtotal + shippingFee;

    return (
        <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-orange-600 mb-3">Đơn hàng của bạn</h2>
            <ul className="divide-y mb-4">
                {cartItems.length === 0 && (
                    <li className="py-4 text-gray-500 text-center">Không có sản phẩm nào trong giỏ.</li>
                )}
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
                            <div className="truncate font-medium">{item.product.name}</div>
                            <div className="text-sm text-gray-500">Số lượng: {item.quantity}</div>
                        </div>
                        <div className="text-orange-600 font-semibold whitespace-nowrap">
                            ₫{(item.product.price * item.quantity).toLocaleString()}
                        </div>
                    </li>
                ))}
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
                className="mt-6 w-full bg-orange-500 text-white font-semibold rounded-lg py-2 hover:bg-orange-600 transition text-lg"
                onClick={onOrder}
            >
                Đặt hàng
            </button>
        </div>
    );
}
