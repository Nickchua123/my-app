import { useState } from "react";
import useCategories from "../hooks/useCategories";

export default function ProductForm({ onSave, initialData, mode = "add" }) {
  const data = initialData || {};
  const [name, setName] = useState(data.name || "");
  const [price, setPrice] = useState(data.price || "");
  const [category, setCategory] = useState(data.category || "");
  const [imageUrl, setImageUrl] = useState(data.imageUrl || "");
  const [errors, setErrors] = useState({});

  const categories = useCategories();

  const validate = () => {
    const newErrors = {};
    const numericPrice = Number(price);

    if (!name.trim()) newErrors.name = "Tên sản phẩm không được để trống.";
    if (!numericPrice || numericPrice <= 0)
      newErrors.price = "Giá phải là số lớn hơn 0.";
    if (!category) newErrors.category = "Vui lòng chọn danh mục.";
    const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i;
    if (!urlPattern.test(imageUrl))
      newErrors.imageUrl = "Link ảnh không hợp lệ (jpg, jpeg, png, webp).";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const productData = {
      ...data,
      name,
      price: Number(price),
      category,
      imageUrl,
    };

    onSave(productData);
  };

  const inputClass = "w-full border p-2 rounded";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold">
        {mode === "edit" ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm mới"}
      </h2>

      <div>
        <label className="block mb-1 font-medium">Tên sản phẩm</label>
        <input
          type="text"
          className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Giá (VNĐ)</label>
        <input
          type="number"
          className={`${inputClass} ${errors.price ? "border-red-500" : ""}`}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Danh mục</label>
        <select
          className={`${inputClass} ${errors.category ? "border-red-500" : ""}`}
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
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Link ảnh sản phẩm</label>
        <input
          type="text"
          className={`${inputClass} ${errors.imageUrl ? "border-red-500" : ""}`}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {errors.imageUrl && (
          <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
        )}
        {imageUrl && !errors.imageUrl && (
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
