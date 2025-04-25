import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../Config/axiosConfig";
import { FaCopy } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductReviews from "./ProductReviews";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImgIdx, setMainImgIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [count, setReviewsCount] = useState(0);
    // Tabs
    const [isDescVisible, setIsDescVisible] = useState(true);
    const [isReviewsVisible, setIsReviewsVisible] = useState(false);
    const [isIntroVisible, setIsIntroVisible] = useState(false);

    // Cart quantity
    const [cartQty, setCartQty] = useState(1);

    // Hàm fetch lại số lượng đánh giá (callback)
    const reloadReviewsCount = async () => {
        try {
            const reviewsCountRes = await api.get(`/products/${id}/reviews/count`);
            setReviewsCount(reviewsCountRes.data.data);
        } catch (error) {
            setReviewsCount(0);
        }
    };

    useEffect(() => {
        async function fetchProductDetails() {
            setLoading(true);
            try {
                // Lấy thông tin sản phẩm
                const productRes = await api.get(`/products/${id}`);
                setProduct(productRes.data.data);

                // Lấy số lượng đánh giá cho sản phẩm
                await reloadReviewsCount();
            } catch (error) {
                setProduct(null);
            } finally {
                setLoading(false);
            }
        }
        fetchProductDetails();
    }, [id]);

    useEffect(() => {
        console.log("Số lượng đánh giá (count) sau khi cập nhật: ", count);
    }, [count]);

    if (loading)
        return (
            <div className="p-10 text-center text-xl">Đang tải thông tin sản phẩm...</div>
        );

    if (!product)
        return (
            <div className="p-10 text-center text-red-500 text-lg">
                Không tìm thấy sản phẩm!
            </div>
        );

    const handleAddToCart = () => {
        alert(
            `Đã thêm "${product.name}" số lượng ${cartQty} vào giỏ hàng!`
        );
    };

    const carouselResponsive = {
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4, partialVisibilityGutter: 40 },
        tablet: { breakpoint: { max: 1024, min: 640 }, items: 2, partialVisibilityGutter: 30 },
        mobile: { breakpoint: { max: 640, min: 0 }, items: 1, partialVisibilityGutter: 20 }
    };

    return (
        <div className="px-4 py-6 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* Gallery */}
                <div className="flex flex-col items-center w-full">
                    {/* Ảnh lớn */}
                    <div className="rounded-xl border-2 border-gray-200 shadow-lg mb-3 overflow-hidden w-full max-w-[420px] h-[320px] flex items-center justify-center bg-gray-50">
                        <img
                            src={`http://localhost:8080/storage/Product-${product.id}/${product.images?.[mainImgIdx]}`}
                            alt={product.name}
                            className="object-contain w-full h-full transition-all duration-200"
                        />
                    </div>
                    {/* Thumbnails */}
                    <div className="flex gap-3 mt-1 w-full justify-center">
                        {product.images?.map((img, idx) => (
                            <img
                                key={idx}
                                src={`http://localhost:8080/storage/Product-${product.id}/${img}`}
                                alt={`Thumbnail ${idx + 1}`}
                                onClick={() => setMainImgIdx(idx)}
                                className={`w-16 h-14 object-cover rounded-md border-2 cursor-pointer transition-all
                                    ${mainImgIdx === idx
                                        ? "border-green-500 ring-2 ring-green-300 scale-110"
                                        : "border-gray-300 hover:border-orange-400 opacity-70 hover:opacity-100"
                                    }
                                `}
                                style={{ background: "#fff" }}
                            />
                        ))}
                    </div>
                </div>
                {/* Thông tin sản phẩm */}
                <div className="space-y-4">
                    <h1 className="font-bold text-2xl text-gray-900">{product.name}</h1>
                    <p className="text-gray-600 flex justify-between items-center">
                        <span>
                            <span className="line-through text-red-400 mr-2">{product.priceOld ?? "₫200.00"}</span>
                            <span className="font-bold text-green-600 text-xl">{product.price?.toLocaleString()} đ</span>
                        </span>
                        <span>
                            <span className="text-yellow-500">⭐ {product.rating ?? "4.6/5"} </span>
                            <span className="text-gray-500 ml-1">{count} đánh giá</span>
                        </span>
                    </p>
                    {/* Thông số kỹ thuật */}
                    <div className="border-t my-4"></div>
                    <h4 className="font-semibold">Cấu hình</h4>
                    <ul className="list-disc ml-6 text-gray-700">
                        <li>CPU: {product.cpu ?? "Intel Pentium Gold 6500Y"}</li>
                        <li>RAM: {product.ram ?? "8GB LPDDR3"}</li>
                        <li>SSD: {product.storage ?? "128GB NVMe"}</li>
                        <li>Card đồ họa: {product.gpu ?? "Intel UHD Graphics 615"}</li>
                        <li>Màn hình: {product.display ?? "10.5 inch 1920 x 1280 (220 PPI)"}</li>
                    </ul>
                    <div className="border-t my-4"></div>
                    {/* Giá + số lượng + giỏ */}
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                        <span className="text-gray-500">Số lượng:</span>
                        <button
                            className="px-3 py-1 border rounded-lg text-lg"
                            onClick={() => setCartQty(q => Math.max(1, q - 1))}
                        >-</button>
                        <input
                            type="number"
                            value={cartQty}
                            min="1"
                            onChange={e => setCartQty(Math.max(1, Number(e.target.value)))}
                            className="w-14 px-2 border rounded text-center"
                        />
                        <button
                            className="px-3 py-1 border rounded-lg text-lg"
                            onClick={() => setCartQty(q => q + 1)}
                        >+</button>
                        <button
                            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold text-lg ml-6"
                            onClick={handleAddToCart}
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                    <div className="border-t my-4"></div>
                    {/* Tabs */}
                    <div>
                        <div className="w-full flex justify-between gap-4 mb-2">
                            <button
                                className={`desc-btn ${isDescVisible ? "bg-gray-200 font-bold" : ""} border rounded-lg p-3 w-full hover:bg-gray-300`}
                                onClick={() => { setIsDescVisible(true); setIsReviewsVisible(false); setIsIntroVisible(false); }}
                            >
                                Mô tả
                            </button>
                            <button
                                className={`desc-btn ${isReviewsVisible ? "bg-gray-200 font-bold" : ""} border rounded-lg p-3 w-full hover:bg-gray-300`}
                                onClick={() => { setIsDescVisible(false); setIsReviewsVisible(true); setIsIntroVisible(false); }}
                            >
                                Đánh giá ({count})
                            </button>
                            <button
                                className={`desc-btn ${isIntroVisible ? "bg-gray-200 font-bold" : ""} border rounded-lg p-3 w-full hover:bg-gray-300`}
                                onClick={() => { setIsDescVisible(false); setIsReviewsVisible(false); setIsIntroVisible(true); }}
                            >
                                Giới thiệu với bạn
                            </button>
                        </div>
                        <div className="border-t my-2"></div>
                        {isDescVisible && (
                            <div className="mt-6 space-y-4 text-gray-700">
                                <h2 className="font-semibold text-lg mb-2 text-gray-800">Mô tả chi tiết</h2>
                                <p>{product.description ?? "Chưa có mô tả cho sản phẩm này."}</p>
                            </div>
                        )}
                        {isReviewsVisible && (
                            <ProductReviews productId={product.id} onReviewSubmitted={reloadReviewsCount} />
                        )}
                        {isIntroVisible && (
                            <div className="mt-6 space-y-6">
                                <div className="p-6 bg-white border rounded-lg shadow">
                                    <h2 className="text-xl font-semibold mb-4">Chương trình giới thiệu</h2>
                                    <div className="referral-codes space-y-4">
                                        <div className="bg-gray-100 p-4 rounded shadow">
                                            <p className="font-semibold">Giới thiệu URL của bạn</p>
                                            <p className="flex items-center justify-between">
                                                Mã giới thiệu chỉ có sẵn cho người dùng có ít nhất một đơn đặt hàng.
                                                <FaCopy className="text-blue-500 cursor-pointer" />
                                            </p>
                                        </div>
                                        <div className="bg-gray-100 p-4 rounded shadow">
                                            <p className="font-semibold">Mã phiếu giảm giá của bạn để chia sẻ</p>
                                            <p className="flex items-center justify-between">
                                                Mã giới thiệu chỉ có sẵn cho người dùng có ít nhất một đơn đặt hàng.
                                                <FaCopy className="text-blue-500 cursor-pointer" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* End tabs */}
                    </div>
                </div>
            </div>
            Sản phẩm nổi bật
            <div className="border-t my-8"></div>
            {/* Carousel sản phẩm nổi bật có thể giữ nguyên hoặc code lại nếu cần */}
        </div>
    );
}
