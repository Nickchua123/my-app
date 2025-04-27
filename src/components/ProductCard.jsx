import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
    const [hovered, setHovered] = useState(false);

    const getImageUrl = (product) => {
        const img = product.images?.[0];
        return img
            ? `http://localhost:8080/storage/Product-${product.id}/${img}`
            : "https://via.placeholder.com/300x200?text=No+Image";
    };

    // List từng trường ra, chỉ render nếu có giá trị
    const infoList = [
        // product.name,
        product.cpu && `CPU: ${product.cpu}`,
        product.ram && `RAM: ${product.ram} GB`,
        product.ssd && `SSD: ${product.ssd}`,
        product.card && `Card: ${product.card}`,
        product.status && `Trạng thái: ${product.status}`,
        // product.price && `Giá: ${product.price.toLocaleString()} đ`
    ].filter(Boolean);

    return (
        <div
            className="relative bg-white rounded-xl shadow p-3 flex flex-col items-center transition duration-300 hover:shadow-2xl cursor-pointer overflow-hidden group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ minHeight: 300 }}
        >
            <Link to={`/product/${product.id}`} className="w-full flex flex-col items-center">
                <div className="relative w-full">
                    <img
                        src={getImageUrl(product)}
                        className="h-28 w-auto mb-2 object-contain rounded transition-all duration-300 w-full"
                        alt={product.name}
                    />
                    {/* Overlay info mỗi trường 1 dòng */}
                    <div className={`absolute left-0 top-0 w-full h-28 flex items-end justify-end pointer-events-none transition-all duration-300
    ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                        <div className="bg-white/90 text-gray-900 rounded-b-xl px-4 py-2 text-[15px] font-medium text-left shadow max-w-[95%] break-words">
                            {infoList.map((line, idx) => (
                                <div key={idx}>{line}</div>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="font-semibold text-base text-center mb-1 truncate w-full mt-2">{product.name}</div>
            </Link>
            <div className="text-orange-600 font-bold mb-2">{product.price?.toLocaleString()} đ</div>
            {onAddToCart && (
                <button
                    onClick={onAddToCart}
                    className="mt-auto w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition"
                >
                    🛒 Thêm vào giỏ hàng
                </button>
            )}
        </div>
    );
}
