// src/admin/ProductForm.jsx
import { useState } from "react";
import useCategories from "../hooks/useCategories";

export default function ProductForm({ onSave, initialData = {}, mode = "add" }) {
  const [name, setName] = useState(initialData.name || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || "");

  const categories = useCategories();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!name.trim()) {
      alert("Vui lòng nhập tên sản phẩm.");
      return;
    }

    const numericPrice = Number(price);
    if (!numericPrice || numericPrice <= 0) {
      alert("Giá sản phẩm phải là số lớn hơn 0.");
      return;
    }

    if (!category) {
      alert("Vui lòng chọn danh mục.");
      return;
    }

    const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i;
    if (!urlPattern.test(imageUrl)) {
      alert("Vui lòng nhập link ảnh hợp lệ (jpg, jpeg, png, webp).");
      return;
    }

    const productData = {
      ...initialData,
      name,
      price: numericPrice,
      category,
      imageUrl,
    };

    onSave(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold">
        {mode === "edit" ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm mới"}
      </h2>

      <div>
        <label className="block mb-1 font-medium">Tên sản phẩm</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Giá (VNĐ)</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Danh mục</label>
        
        <select
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Link ảnh sản phẩm</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {imageUrl && (
          <img src={imageUrl} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded" />
        )}
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
      >
        {mode === "edit" ? "Lưu thay đổi" : "Thêm sản phẩm"}
      </button>
    </form>
  );
}
