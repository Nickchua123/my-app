import { useEffect, useState } from "react";
import axios from "axios";
import useCategories from "../hooks/useCategories";

export default function ProductForm({ onSaveSuccess, initialData = {}, mode = "add" }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    //category: "",
    quantity: 0,
    brand: "",
    warranty: "",
  });

  const [errors, setErrors] = useState({});
  //const categories = useCategories();

  useEffect(() => {
    if (initialData) {
      setProduct(initialData);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "Tên sản phẩm không được để trống.";
    if (!product.price || Number(product.price) <= 0) newErrors.price = "Giá phải lớn hơn 0.";
    //if (!product.category) newErrors.category = "Vui lòng chọn danh mục.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const url = "http://localhost:8080/api/v1/products";
      const method = mode === "edit" ? "put" : "post";
      await axios[method](url, product);

      alert("✅ Gửi dữ liệu thành công!");
      onSaveSuccess && onSaveSuccess();
    } catch (err) {
      console.error("❌ Lỗi gửi dữ liệu:", err);
      alert("❌ Không gửi được dữ liệu");
    }
  };

  const inputClass = "w-full border p-2 rounded";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold">
        {mode === "edit" ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm mới"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Tên sản phẩm */}
        <div>
          <label>Tên sản phẩm *</label>
          <input
            type="text"
            className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Giá */}
        <div>
          <label>Giá (VNĐ) *</label>
          <input
            type="number"
            className={`${inputClass} ${errors.price ? "border-red-500" : ""}`}
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        {/* Danh mục
        <div>
          <label>Danh mục *</label>
          <select
            className={`${inputClass} ${errors.category ? "border-red-500" : ""}`}
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div> */}

        {/* Số lượng */}
        <div>
          <label>Số lượng</label>
          <input
            type="number"
            className={inputClass}
            value={product.quantity}
            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          />
        </div>

        {/* Hãng */}
        <div>
          <label>Hãng</label>
          <input
            type="text"
            className={inputClass}
            value={product.brand}
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
          />
        </div>

        {/* Bảo hành */}
        <div>
          <label>Bảo hành</label>
          <input
            type="text"
            className={inputClass}
            value={product.warranty}
            onChange={(e) => setProduct({ ...product, warranty: e.target.value })}
          />
        </div>
      </div>

      {/* Mô tả */}
      <div>
        <label>Mô tả</label>
        <textarea
          rows={4}
          className={inputClass}
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
      </div>

      {/* Nút gửi */}
      <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
        {mode === "edit" ? "💾 Lưu thay đổi" : "✅ Thêm sản phẩm"}
      </button>
    </form>
  );
}
