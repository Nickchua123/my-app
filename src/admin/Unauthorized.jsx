// Unauthorized.jsx – Trang hiển thị khi không đủ quyền truy cập
export default function Unauthorized() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">🚫 Truy cập bị từ chối</h1>
        <p className="text-gray-700 text-lg mb-6">
          Bạn không có quyền truy cập vào chức năng này. Vui lòng liên hệ quản trị viên nếu cần hỗ trợ.
        </p>
        <a
          href="/admin"
          className="px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 font-medium"
        >
          ⬅️ Quay về trang Admin
        </a>
      </div>
    );
  }
  