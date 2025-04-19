import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import useCategories from "../hooks/useCategories";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const categories = useCategories();
  const currentAdmin = localStorage.getItem("currentAdmin");
  const admins = JSON.parse(localStorage.getItem("admins")) || [];
  const currentRole = admins.find((a) => a.email === currentAdmin)?.role;
  const isViewer = currentRole === "viewer";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/products");
      setProducts(res.data.data.result);
    } catch (err) {
      console.error("❌ Lỗi khi load sản phẩm:", err);
    }
  };

  //  NEW: Chuyển base64 -> File vì base64 k t
  const base64ToFile = async (base64, filename) => {
    const res = await fetch(base64);
    const blob = await res.blob();
    const ext = base64.split(";")[0].split("/")[1];
    return new File([blob], `${filename}.${ext}`, { type: blob.type });
  };

  // ✅ NEW: Gửi FormData chứa JSON + ảnh
  const handleSave = async (productData) => {
    try {
      const formData = new FormData();

      const productCopy = {
        ...productData,
        id: editData?.id,
        category: { id: productData.category?.id || productData.category },
      };
      delete productCopy.images;

      formData.append("product", JSON.stringify(productCopy));

      // Lọc ảnh mới (chỉ base64)
      const base64Images = productData.images.filter((img) =>
        img.startsWith("data:")
      );

      // Nếu có ảnh mới thì chuyển sang file và gửi
      if (base64Images.length > 0) {
        const imageFiles = await Promise.all(
          base64Images.map(async (base64, idx) => {
            const res = await fetch(base64);
            const blob = await res.blob();
            const ext = base64.split(";")[0].split("/")[1];
            return new File([blob], `image-${Date.now()}-${idx}.${ext}`, {
              type: blob.type,
            });
          })
        );
        imageFiles.forEach((file) => formData.append("files", file));
      }

      console.log("📦 JSON gửi lên:", JSON.stringify(productCopy));
      console.log("🖼️ Gửi ảnh mới?", base64Images.length > 0);

      // Gửi request
      if (editData) {
        await axios.post("http://localhost:8080/api/v1/products/images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:8080/api/v1/img", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchProducts();
      setShowForm(false);
      setEditData(null);
    } catch (err) {
      console.error("❌ Không thể lưu sản phẩm:", err);
      alert("Lỗi khi lưu sản phẩm: " + err.message);
    }
  };






  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/v1/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("❌ Lỗi khi xoá:", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📦 Danh sách sản phẩm</h1>
        {!isViewer && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setShowForm(true);
              setEditData(null);
            }}
          >
            ➕ Thêm sản phẩm
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm bg-white shadow rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Ảnh</th>
              <th className="p-3">Tên</th>
              <th className="p-3">Giá</th>
              <th className="p-3">Danh mục</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  {p.images?.[0] ? (
                    <img
                      src={`http://localhost:8080/storage/product-${p.id}/${p.images[0]}`}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded cursor-pointer"
                      onClick={() =>
                        setPreviewImage(`http://localhost:8080/storage/product-${p.id}/${p.images[0]}`)
                      }
                    />

                  ) : (
                    "Không có ảnh"
                  )}
                </td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 text-orange-600">{p.price?.toLocaleString()} đ</td>
                <td className="p-3 capitalize">
                  {p.category?.label || "Không rõ"}
                </td>

                <td className="p-3 text-center">
                  {!isViewer ? (
                    <>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        onClick={() => {
                          setEditData(p);
                          setShowForm(true);
                        }}
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(p.id)}
                      >
                        🗑️ Xoá
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 italic">Chỉ xem</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowForm(false);
                setEditData(null);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
            <ProductForm
              mode={editData ? "edit" : "add"}
              initialData={editData}
              onSave={handleSave}
            />
          </div>
        </div>
      )}

      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setPreviewImage(null)}
        >
          <img src={previewImage} alt="Preview" className="max-w-[90%] max-h-[90%] rounded shadow-lg" />
        </div>
      )}
    </div>
  );
}
