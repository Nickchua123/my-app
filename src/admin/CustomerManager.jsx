// CustomerManager.jsx – giới hạn quyền sửa xoá với viewer
import { useEffect, useState } from "react";

export default function CustomerManager() {
  const [customers, setCustomers] = useState([]);

  const currentAdmin = localStorage.getItem("currentAdmin");
  const admins = JSON.parse(localStorage.getItem("admins")) || [];
  const currentRole = admins.find((a) => a.email === currentAdmin)?.role;
  const isViewer = currentRole === "viewer";

  useEffect(() => {
    const stored = localStorage.getItem("customers");
    if (stored) {
      setCustomers(JSON.parse(stored));
    } else {
      const dummy = [
        {
          id: "KH001",
          name: "Nguyễn Văn A",
          email: "a@gmail.com",
          phone: "0912345678",
          address: "Hà Nội",
          orders: 2,
          totalSpent: 40000000,
        },
        {
          id: "KH002",
          name: "Trần Thị B",
          email: "b@gmail.com",
          phone: "0987654321",
          address: "TP.HCM",
          orders: 1,
          totalSpent: 15000000,
        },
      ];
      setCustomers(dummy);
      localStorage.setItem("customers", JSON.stringify(dummy));
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👤 Quản lý khách hàng</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Mã KH</th>
              <th className="p-3">Họ tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">SĐT</th>
              <th className="p-3">Địa chỉ</th>
              <th className="p-3 text-right">Số đơn</th>
              <th className="p-3 text-right">Tổng chi tiêu</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-semibold">{c.id}</td>
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3">{c.address}</td>
                <td className="p-3 text-right">{c.orders}</td>
                <td className="p-3 text-right text-orange-500">
                  {c.totalSpent.toLocaleString()} đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isViewer && (
          <p className="mt-4 text-sm text-gray-500 italic">* Bạn đang ở chế độ chỉ xem.</p>
        )}
      </div>
    </div>
  );
}
