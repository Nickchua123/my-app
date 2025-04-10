import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductForm({ onSaveSuccess, initialData = {}, mode = "add" }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    quantity: 0,
    brand: "",
    warranty: "",
    image: "", // Thêm trường để lưu ảnh
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null); // Để hiển thị ảnh preview

  useEffect(() => {
    if (initialData) {
      setProduct(initialData);
      if (initialData.image) {
        setImagePreview(initialData.image); // Nếu có ảnh ban đầu, hiển thị preview
      }
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "Tên sản phẩm không được để trống.";
    if (!product.price || Number(product.price) <= 0) newErrors.price = "Giá phải lớn hơn 0.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("quantity", product.quantity);
    formData.append("brand", product.brand);
    formData.append("warranty", product.warranty);

    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      const url = "http://localhost:8080/api/v1/products";
      const method = mode === "edit" ? "put" : "post";
      await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Gửi dữ liệu thành công!");
      onSaveSuccess && onSaveSuccess();
    } catch (err) {
      console.error("❌ Lỗi gửi dữ liệu:", err);
      alert("❌ Không gửi được dữ liệu");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass = "w-full border p-2 rounded";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold">
        {mode === "edit" ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm mới"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>

      <div>
        <label>Mô tả</label>
        <textarea
          rows={4}
          className={inputClass}
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
      </div>

      <div>
        <label>Ảnh sản phẩm</label>
        <input
          type="file"
          accept="image/*"
          className={inputClass}
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover" />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
          {mode === "edit" ? "💾 Lưu thay đổi" : "✅ Thêm sản phẩm"}
        </button>
      </div>
    </form>
  );
}
