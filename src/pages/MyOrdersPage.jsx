import { useEffect, useState } from "react";
import api from "../Config/axiosConfig";
import { format, subDays } from "date-fns";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const STATUS_OPTIONS = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "PENDING", label: "🕒 Chờ xác nhận" },
    { value: "SUCCESS", label: "✅ Đã thanh toán" },
    { value: "FAILED", label: "❌ Thất bại" },
    { value: "CANCELLED", label: "🚫 Đã huỷ" },
];

const DATE_FILTERS = [
    { label: "Tất cả thời gian", value: "all" },
    { label: "7 ngày qua", value: "7" },
    { label: "30 ngày qua", value: "30" },
];

const STATUS_LABELS = {
    PENDING: "Chờ xác nhận",
    SUCCESS: "Đã thanh toán",
    FAILED: "Thất bại",
    CANCELLED: "Đã huỷ",
};

export default function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateRange, setDateRange] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        let url = `/orders/my?page=${page}&size=5`;
        if (statusFilter !== "all") url += `&status=${statusFilter}`;

        if (dateRange !== "all") {
            const days = parseInt(dateRange);
            const today = new Date();
            const fromDate = format(subDays(today, days), "yyyy-MM-dd");
            const toDate = format(today, "yyyy-MM-dd");
            url += `&fromDate=${fromDate}&toDate=${toDate}`;
        }

        api.get(url)
            .then((res) => {
                const { content, totalPages } = res.data.data || {};
                setOrders(content || []);
                setTotalPages(totalPages || 0);
            })
            .catch(() => alert("Không lấy được danh sách đơn hàng."));
    }, [page, statusFilter, dateRange]);

    async function handlePrint() {
        const element = document.querySelector(".invoice-content");
        if (!element) return;

        // ⚠️ Gỡ màu oklch: ép style đơn giản để tránh lỗi
        const originalStyles = [];
        element.querySelectorAll("*").forEach((el, i) => {
            originalStyles[i] = {
                color: el.style.color,
                backgroundColor: el.style.backgroundColor,
            };
            el.style.color = "#000";
            el.style.backgroundColor = "transparent";
        });

        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        const fileName = `don-hang-${selectedOrder.id}.pdf`;
        pdf.save(fileName);

        // ✅ Gửi file PDF qua email (giả định API đã tồn tại)
        const blob = pdf.output("blob");
        const formData = new FormData();
        formData.append("file", blob, fileName);
        formData.append("orderId", selectedOrder.id);

        try {
            await api.post("/orders/send-invoice", formData);
            alert("📧 Hoá đơn đã được gửi tới email của bạn!");
        } catch (err) {
            console.error("Lỗi gửi email:", err);
            alert("Gửi email thất bại. Vui lòng thử lại sau.");
        }

        // ✅ Khôi phục lại style ban đầu
        element.querySelectorAll("*").forEach((el, i) => {
            el.style.color = originalStyles[i].color;
            el.style.backgroundColor = originalStyles[i].backgroundColor;
        });
    }


    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-orange-600 mb-6">📜 Lịch sử đơn hàng</h1>

            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <select
                        value={statusFilter}
                        onChange={(e) => { setPage(0); setStatusFilter(e.target.value); }}
                        className="border px-4 py-2 rounded shadow-sm text-sm"
                    >
                        {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>

                    <select
                        value={dateRange}
                        onChange={(e) => { setPage(0); setDateRange(e.target.value); }}
                        className="border px-4 py-2 rounded shadow-sm text-sm"
                    >
                        {DATE_FILTERS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <span className="text-gray-600 text-sm">
                    Tổng: <strong>{orders.length}</strong> đơn
                </span>
            </div>

            {orders.length === 0 ? (
                <p className="text-gray-500 italic">Không có đơn hàng nào.</p>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-xl shadow-md text-sm overflow-hidden">
                            <thead className="bg-gray-100 text-gray-600 text-left">
                                <tr>
                                    <th className="p-4">Mã đơn</th>
                                    <th className="p-4">Ngày đặt</th>
                                    <th className="p-4">Trạng thái</th>
                                    <th className="p-4 text-right">Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-t hover:bg-orange-50 transition-all duration-150 ease-in-out">
                                        <td className="p-4 font-semibold text-orange-600 cursor-pointer hover:underline" onClick={() => setSelectedOrder(order)}>
                                            #{order.id}
                                        </td>
                                        <td className="p-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${order.paymentStatus === "SUCCESS" ? "bg-green-100 text-green-700" :
                                                order.paymentStatus === "FAILED" ? "bg-red-100 text-red-700" :
                                                    order.paymentStatus === "CANCELLED" ? "bg-gray-100 text-gray-700" :
                                                        "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                {STATUS_LABELS[order.paymentStatus] || order.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right text-orange-500 font-bold">
                                            ₫{order.totalAmount.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mt-6 gap-2 text-sm">
                        <button
                            onClick={() => setPage(p => Math.max(p - 1, 0))}
                            disabled={page === 0}
                            className="px-4 py-2 rounded bg-white border shadow-sm hover:bg-gray-50 disabled:opacity-50"
                        >← Trước</button>
                        <span className="px-4 py-2 text-gray-600 font-medium">Trang {page + 1} / {totalPages}</span>
                        <button
                            onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
                            disabled={page >= totalPages - 1}
                            className="px-4 py-2 rounded bg-white border shadow-sm hover:bg-gray-50 disabled:opacity-50"
                        >Tiếp →</button>
                    </div>
                </>
            )}

            {selectedOrder && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white w-full max-w-2xl rounded-lg p-6 relative shadow-lg max-h-[90vh] overflow-y-auto invoice-content">
                        <button onClick={() => setSelectedOrder(null)} className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black">×</button>
                        <h2 className="text-xl font-bold mb-4">🧾 Đơn hàng #{selectedOrder.id}</h2>
                        <div className="text-sm space-y-1 mb-4">
                            <p><strong>Ngày đặt:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                            <p><strong>Trạng thái:</strong> {STATUS_LABELS[selectedOrder.paymentStatus]}</p>
                            <p><strong>Tổng tiền:</strong> ₫{selectedOrder.totalAmount.toLocaleString()}</p>
                        </div>
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-2">📦 Sản phẩm:</h3>
                            {selectedOrder.items?.map((item, idx) => (
                                <div key={idx} className="flex gap-3 items-center border-b py-2">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    <div className="flex-1 text-sm">
                                        <p className="font-medium">{item.name}</p>
                                        <p>Số lượng: {item.quantity}</p>
                                        <p>Giá: ₫{item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handlePrint} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                            🖨️ In hoá đơn PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
