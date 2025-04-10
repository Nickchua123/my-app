import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductManager() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [errors, setErrors] = useState({});

    const inputClass = "w-full border p-2 rounded";

    // Gọi API lấy danh sách sản phẩm
    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/products");
            setProducts(res.data.data); // lấy đúng mảng data
        } catch (err) {
            console.error("❌ Lỗi khi load sản phẩm:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Kiểm tra dữ liệu hợp lệ
    const validate = (product) => {
        const newErrors = {};
        if (!product.name?.trim()) newErrors.name = "Tên sản phẩm không được để trống.";
        if (!product.price || Number(product.price) <= 0) newErrors.price = "Giá phải lớn hơn 0.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Gửi cập nhật sản phẩm
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate(selectedProduct)) return;

        try {
            await axios.put("http://localhost:8080/api/v1/products", selectedProduct);
            alert("✅ Cập nhật sản phẩm thành công!");
            setSelectedProduct(null);
            fetchProducts(); // load lại danh sách
        } catch (err) {
            console.error("❌ Lỗi khi cập nhật:", err);
            alert("❌ Không cập nhật được sản phẩm");
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">📦 Danh sách sản phẩm</h2>

            <ul className="space-y-2 mb-6">
                {products.map((p) => (
                    <li
                        key={p.id}
                        className="border p-3 rounded flex justify-between items-center"
                    >
                        <div>
                            <strong>{p.name}</strong> – {p.price} VNĐ
                        </div>
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={() => setSelectedProduct(p)}
                        >
                            ✏️ Sửa
                        </button>
                    </li>
                ))}
            </ul>

            {/* Form chỉnh sửa sản phẩm */}
            {selectedProduct && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-md space-y-4"
                >
                    <h3 className="text-xl font-semibold">✏️ Chỉnh sửa sản phẩm</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label>Tên sản phẩm *</label>
                            <input
                                type="text"
                                className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
                                value={selectedProduct.name}
                                onChange={(e) =>
                                    setSelectedProduct({ ...selectedProduct, name: e.target.value })
                                }
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div>
                            <label>Giá (VNĐ) *</label>
                            <input
                                type="number"
                                className={`${inputClass} ${errors.price ? "border-red-500" : ""}`}
                                value={selectedProduct.price}
                                onChange={(e) =>
                                    setSelectedProduct({ ...selectedProduct, price: e.target.value })
                                }
                            />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                        </div>

                        <div>
                            <label>Số lượng</label>
                            <input
                                type="number"
                                className={inputClass}
                                value={selectedProduct.quantity}
                                onChange={(e) =>
                                    setSelectedProduct({ ...selectedProduct, quantity: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label>Hãng</label>
                            <input
                                type="text"
                                className={inputClass}
                                value={selectedProduct.brand}
                                onChange={(e) =>
                                    setSelectedProduct({ ...selectedProduct, brand: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label>Bảo hành</label>
                            <input
                                type="text"
                                className={inputClass}
                                value={selectedProduct.warranty}
                                onChange={(e) =>
                                    setSelectedProduct({ ...selectedProduct, warranty: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label>Mô tả</label>
                        <textarea
                            rows={4}
                            className={inputClass}
                            value={selectedProduct.description}
                            onChange={(e) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            💾 Lưu thay đổi
                        </button>
                        <button
                            type="button"
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                            onClick={() => setSelectedProduct(null)}
                        >
                            ❌ Hủy
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
