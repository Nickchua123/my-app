import { useState, useEffect } from "react";
import useCategories from "../hooks/useCategories";

export default function ProductForm({ onSave, initialData, mode = "add" }) {
  const data = initialData || {}; // Dữ liệu ban đầu
  const [name, setName] = useState(data.name || "");
  const [price, setPrice] = useState(data.price || "");
  const [category, setCategory] = useState(data.category || "");
  const [quantity, setQuantity] = useState(data.quantity || 0);
  const [brand, setBrand] = useState(data.brand || "");
  const [warranty, setWarranty] = useState(data.warranty || "");
  const [description, setDescription] = useState(data.description || "");
  const [status, setStatus] = useState(data.status || "available");
  const [rating, setRating] = useState(data.rating || 5);
  const [images, setImages] = useState(data.images || []);
  const [errors, setErrors] = useState({});

  const categories = useCategories();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Tên không được để trống.";
    if (!price || Number(price) <= 0) newErrors.price = "Giá phải > 0.";
    if (!category) newErrors.category = "Chọn danh mục.";
    if (images.length === 0) newErrors.images = "Cần ít nhất 1 ảnh.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const productData = {
      name,
      price: Number(price),
      category,
      quantity: Number(quantity),
      brand,
      warranty,
      description,
      status,
      rating: Number(rating),
      images,
    };

    onSave(productData); // Gọi onSave để lưu sản phẩm
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold">
        {mode === "edit" ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm mới"}
      </h2>

      {/* Các trường nhập liệu như tên, giá, mô tả, v.v... */}
      <div>
        <label>Tên sản phẩm</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <p>{errors.name}</p>}
      </div>

      {/* Các trường khác... */}

      <button type="submit">
        {mode === "edit" ? "💾 Lưu thay đổi" : "✅ Thêm sản phẩm"}
      </button>
    </form>
  );
}
