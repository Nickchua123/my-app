import { useState, useEffect } from "react";
import api from "../Config/axiosConfig";

export default function ProductReviews({ productId, onReviewSubmitted }) {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0); // Trang hiện tại
    const [size] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Lấy review khi page hoặc productId thay đổi
    useEffect(() => {
        let isMounted = true;
        async function fetchReviews() {
            setReviewLoading(true);
            try {
                const res = await api.get(`/products/${productId}/reviews?page=${page}&size=${size}`);
                if (isMounted) {
                    setReviews(res.data.data.content || []);
                    setTotalPages(res.data.data.totalPages || 1);
                }
            } catch (error) {
                if (isMounted) setReviews([]);
            } finally {
                if (isMounted) setReviewLoading(false);
            }
        }
        if (productId) fetchReviews();
        return () => { isMounted = false; };
    }, [productId, page, size]);

    // Gửi review mới
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (rating === 0 || comment.trim() === "") {
            alert("Vui lòng chọn số sao và nhập nội dung đánh giá.");
            return;
        }
        setSubmitting(true);
        try {
            await api.post(`/products/${productId}/reviews`, {
                rating,
                review: comment
            });

            // Gọi callback cập nhật số lượng review ở cha
            if (typeof onReviewSubmitted === "function") {
                onReviewSubmitted();
            }

            setSuccessMessage("Đánh giá của bạn đã được gửi thành công!");
            setRating(0);
            setComment("");
            // Reload lại danh sách review (ở trang hiện tại)
            const res = await api.get(`/products/${productId}/reviews?page=${page}&size=${size}`);
            setReviews(res.data.data.content || []);
            setTotalPages(res.data.data.totalPages || 1);
        } catch (err) {
            alert("Đã có lỗi xảy ra khi gửi đánh giá!");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-6 space-y-6">
            {/* Danh sách review với loading overlay */}
            <div className="relative">
                {/* Loading overlay mờ khi đang tải review */}
                {reviewLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
                        <svg className="animate-spin h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                    </div>
                )}
                <div className={`review-list transition-opacity duration-200 ${reviewLoading ? "opacity-60 pointer-events-none" : ""}`}>
                    {reviews.length === 0 ? (
                        <div>Chưa có đánh giá nào cho sản phẩm này.</div>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="bg-gray-100 p-4 rounded shadow-sm mb-2">
                                <div className="flex justify-between">
                                    <strong>{review.user?.name || "Ẩn danh"}</strong>
                                    <span>{review.createdAt?.slice(0, 10)}</span>
                                </div>
                                <div className="text-yellow-500">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-400"}>★</span>
                                    ))}
                                </div>
                                <p>{review.review}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Phân trang với spinner trên nút đang loading */}
            <div className="flex justify-center gap-2 my-3">
                {[...Array(totalPages).keys()].map((p) => (
                    <button
                        key={p}
                        onClick={() => !reviewLoading && setPage(p)}
                        className={`px-3 py-1 rounded ${page === p ? "bg-orange-500 text-white" : "bg-gray-200"} relative`}
                        disabled={reviewLoading && page === p}
                    >
                        {page === p && reviewLoading ? (
                            <svg className="inline animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                        ) : (
                            p + 1
                        )}
                    </button>
                ))}
            </div>

            {/* Form gửi đánh giá */}
            <form
                className="review-form p-4 border rounded shadow bg-white w-full"
                onSubmit={handleSubmitReview}
            >
                <h3 className="text-lg font-semibold mb-2">Đánh giá của bạn</h3>
                <div className="star-rating flex space-x-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`cursor-pointer text-3xl ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
                            onClick={() => setRating(star)}
                        >★</span>
                    ))}
                </div>
                <textarea
                    className="w-full h-24 p-3 border rounded resize-none"
                    placeholder="Nhập đánh giá của bạn..."
                    value={comment}
                    onFocus={() => {
                        if (successMessage) setSuccessMessage("");
                    }}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-3 p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {submitting ? "Đang gửi..." : "Nộp"}
                </button>
            </form>

            {/* Thông báo thành công */}
            {successMessage && (
                <div className="mt-4 text-green-600">
                    <strong>{successMessage}</strong>
                </div>
            )}
        </div>
    );
}
