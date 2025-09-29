import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductForm from "./ProductForm";
import useCategories from "../hooks/useCategories";

// Lucide icons
import {
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Pagination
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageParam - 1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  // Categories
  const categories = useCategories();

  // Role check
  const currentAdmin = localStorage.getItem("currentAdmin");
  const admins = JSON.parse(localStorage.getItem("admins")) || [];
  const currentRole = admins.find((a) => a.email === currentAdmin)?.role;
  const isViewer = currentRole === "viewer";

  // Sync page state with query param
  useEffect(() => {
    setCurrentPage(pageParam - 1);
  }, [pageParam]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page = 0) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/products?page=${page}&size=${pageSize}`
      );
      const data = res.data.data;
      setProducts(data.result);
      setTotalPages(data.meta.pages);
    } catch (err) {
      console.error("❌ Lỗi khi load sản phẩm:", err);
    }
  };

  // Save product
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

      const base64Images = productData.images.filter((img) =>
        img.startsWith("data:")
      );

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

      if (editData) {
        await axios.put(
          `http://localhost:8080/api/v1/products/${editData.id}/images`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("http://localhost:8080/api/v1/products/img", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await fetchProducts(currentPage);
      setShowForm(false);
      setEditData(null);
    } catch (err) {
      console.error("❌ Không thể lưu sản phẩm:", err);
      alert("Lỗi khi lưu sản phẩm: " + err.message);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/v1/products/${id}`);
      await fetchProducts(currentPage);
    } catch (err) {
      console.error("❌ Lỗi khi xoá:", err);
    }
  };

  // Page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSearchParams({ page: newPage + 1 });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" />
          Danh sách sản phẩm
        </h1>
        {!isViewer && (
          <button
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            onClick={() => {
              setShowForm(true);
              setEditData(null);
            }}
          >
            <Plus className="w-4 h-4" />
            Thêm sản phẩm
          </button>
        )}
      </div>

      {/* Table */}
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
                      className="w-16 h-16 object-cover rounded cursor-pointer border"
                      onClick={() =>
                        setPreviewImage(
                          `http://localhost:8080/storage/product-${p.id}/${p.images[0]}`
                        )
                      }
                    />
                  ) : (
                    <span className="text-gray-400 italic">Không có ảnh</span>
                  )}
                </td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 text-orange-600">
                  {p.price?.toLocaleString()} đ
                </td>
                <td className="p-3 capitalize">
                  {p.category?.label || "Không rõ"}
                </td>
                <td className="p-3 text-center">
                  {!isViewer ? (
                    <div className="flex justify-center gap-2">
                      <button
                        className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        onClick={() => {
                          setEditData(p);
                          setShowForm(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                        Sửa
                      </button>
                      <button
                        className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        onClick={() => handleDelete(p.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Xoá
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">Chỉ xem</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowForm(false);
                setEditData(null);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>
            <ProductForm
              mode={editData ? "edit" : "add"}
              initialData={editData}
              onSave={handleSave}
            />
          </div>
        </div>
      )}

      {/* Preview Image */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] rounded shadow-lg border-4 border-white"
          />
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
          disabled={currentPage === 0}
          className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Trước
        </button>

        <span className="font-medium">
          Trang {currentPage + 1} / {totalPages}
        </span>

        <button
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages - 1))
          }
          disabled={currentPage >= totalPages - 1}
          className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Sau
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
