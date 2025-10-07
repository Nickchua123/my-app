import React from "react";

export default function UserSidebar({ active, setActive }) {
    const menuItems = [
        { key: "account", label: "Thông tin tài khoản" },
        { key: "address", label: "Sổ địa chỉ" },
        { key: "orders", label: "Đơn hàng của tôi" },
        { key: "wishlist", label: "Danh sách yêu thích" },
        { key: "newsletter", label: "Đăng ký nhận tin" },
    ];

    return (
        <aside className="w-64 border-r">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Bảng điều khiển</h2>
            </div>
            <nav className="flex flex-col">
                {menuItems.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => setActive(item.key)}
                        className={`px-4 py-2 text-left transition ${active === item.key
                                ? "bg-blue-50 font-semibold border-l-4 border-blue-500"
                                : "hover:bg-gray-50"
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}
