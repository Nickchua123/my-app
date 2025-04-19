import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductForm({ onSave, initialData, mode = "add" }) {
  const data = initialData || {};
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
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  const categories = ["Electronics", "Clothing", "Furniture", "Food"]; // Example categories

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Tên sản phẩm không được để trống.";
    if (!price || Number(price) <= 0) newErrors.price = "Giá phải > 0.";
    if (!category) newErrors.category = "Chọn danh mục.";
    if (images.length === 0) newErrors.images = "Cần ít nhất 1 ảnh.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3 - images.length);
    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          if (file.size > 1024 * 1024) {
            alert(`❌ Ảnh "${file.name}" vượt quá 1MB và đã bị bỏ qua.`);
            return resolve(null);
          }
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      })
    ).then((base64Images) => {
      const validImages = base64Images.filter((img) => img !== null);
      setImages((prev) => [...prev, ...validImages].slice(0, 3));
    });
  };

  const handleImageRemove = (idx) => {
    const updated = [...images];
    updated.splice(idx, 1);
    setImages(updated);
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

    onSave(productData); // Call the onSave function to save the data
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold">{mode === "edit" ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm mới"}</h2>

      {/* Product Name */}
      <div>
        <label>Tên sản phẩm</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Product Price */}
      <div>
        <label>Giá (VNĐ)</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>

      {/* Product Category */}
      <div>
        <label>Danh mục</label>
        <select
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>

      {/* Product Quantity */}
      <div>
        <label>Số lượng</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      {/* Product Brand */}
      <div>
        <label>Hãng</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>

      {/* Product Warranty */}
      <div>
        <label>Bảo hành</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={warranty}
          onChange={(e) => setWarranty(e.target.value)}
        />
      </div>

      {/* Product Description */}
      <div>
        <label>Mô tả chi tiết</label>
        <textarea
          rows={4}
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Product Images */}
      <div>
        <label>Ảnh sản phẩm (tối đa 3 ảnh dưới 1MB)</label>
        <div className="flex gap-2 my-2">
          <button
            type="button"
            onClick={() => document.getElementById("uploadInput").click()}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            ➕ Thêm ảnh
          </button>
          <input
            id="uploadInput"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
        <div className="grid grid-cols-3 gap-4 mt-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative">
              <img
                src={img}
                alt="preview"
                onClick={() => setPreviewImage(img)}
                className="w-full aspect-square object-cover rounded border cursor-pointer"
              />
              <button
                type="button"
                onClick={() => handleImageRemove(idx)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
        {mode === "edit" ? "💾 Lưu thay đổi" : "✅ Thêm sản phẩm"}
      </button>
    </form>
  );
}
