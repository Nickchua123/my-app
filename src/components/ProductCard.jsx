import React from "react";

export default function ProductCard({ product }) {
    const getImageUrl = (p) =>
        p.images?.[0]
            ? `http://localhost:8080/storage/Product-${p.id}/${p.images[0]}`
            : "https://via.placeholder.com/300x200?text=No+Image";

    return (
        <div className="bg-white rounded-lg shadow hover:shadow-lg p-4 flex flex-col transition duration-200">
            {/* Ảnh */}
            <img
                src={getImageUrl(product)}
                alt={product.name}
                className="h-40 object-contain mb-3 mx-auto"
            />

            {/* Tên */}
            <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center text-yellow-400 text-xs mb-1">
                {"★".repeat(5)}
                <span className="text-gray-500 ml-1">(4)</span>
            </div>

            {/* Giá */}
            <div className="flex flex-col items-start mb-1">
                {product.oldPrice && (
                    <span className="text-gray-400 line-through text-sm">
                        {product.oldPrice.toLocaleString()} đ
                    </span>
                )}
                <span className="text-lg font-bold text-black">
                    {product.price?.toLocaleString()} đ
                </span>
            </div>

            {/* Trạng thái */}
            {product.stockQuantity > 0 ? (
                <p className="text-green-600 text-xs font-medium">Còn hàng</p>
            ) : (
                <p className="text-red-600 text-xs font-medium">Hết hàng</p>
            )}
        </div>
    );
}
