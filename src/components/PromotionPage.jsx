import { Link } from "react-router-dom";

export default function PromotionPage() {
    // Có thể fetch API khuyến mãi thật nếu muốn
    const promotions = [
        {
            id: 1,
            title: "Giảm 10% cho đơn laptop trên 15 triệu",
            desc: "Chỉ áp dụng cho dòng laptop gaming, doanh nhân. Không áp dụng kèm ưu đãi khác.",
            valid: "Đến hết 30/6/2024",
        },
        {
            id: 2,
            title: "Freeship toàn quốc",
            desc: "Miễn phí vận chuyển cho mọi đơn hàng.",
            valid: "Từ 1/6 - 30/6/2024",
        },
        {
            id: 3,
            title: "Tặng chuột không dây cho đơn PC mới",
            desc: "Áp dụng khi mua combo PC mới nguyên bộ.",
            valid: "Đến 15/7/2024",
        },
        // ...
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-orange-600">🎉 Chương trình khuyến mãi</h1>
            <div className="space-y-6">
                {promotions.map((promo) => (
                    <div key={promo.id} className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-5 shadow flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-orange-700">{promo.title}</h2>
                            <p className="text-gray-700 mt-1">{promo.desc}</p>
                            <p className="text-xs text-gray-500 mt-2">Hiệu lực: <span className="font-semibold">{promo.valid}</span></p>
                        </div>
                        <Link
                            to="/"
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-orange-600 transition text-center"
                        >
                            Mua ngay
                        </Link>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center">
                <Link to="/" className="text-orange-500 hover:underline font-medium">
                    ← Quay lại trang chủ
                </Link>
            </div>
        </div>
    );
}
