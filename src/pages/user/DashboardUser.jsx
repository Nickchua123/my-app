import { useState } from "react";
import { Link } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar";

export default function UserDashboard() {
    const [active, setActive] = useState("account");

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow rounded-lg flex">

                {/* Sidebar */}
                <UserSidebar active={active} setActive={setActive} />

                {/* Main content */}
                <main className="flex-1 p-6">
                    {active === "account" && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Thông tin tài khoản</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold">Thông tin liên hệ</h3>
                                    <p className="text-gray-600">Nguyễn Văn A</p>
                                    <p className="text-gray-600">example@gmail.com</p>
                                    <div className="mt-2 space-x-3 text-sm text-blue-600">
                                        <Link to="#">Chỉnh sửa</Link>
                                        <Link to="#">Đổi mật khẩu</Link>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Bản tin</h3>
                                    <p className="text-gray-600">Bạn chưa đăng ký nhận bản tin.</p>
                                    <div className="mt-2 text-sm text-blue-600">
                                        <Link to="#">Đăng ký</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {active === "address" && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Sổ địa chỉ</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold">Địa chỉ thanh toán mặc định</h3>
                                    <p className="text-gray-600">Bạn chưa thiết lập địa chỉ thanh toán.</p>
                                    <Link to="#" className="text-sm text-blue-600">Chỉnh sửa địa chỉ</Link>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Địa chỉ giao hàng mặc định</h3>
                                    <p className="text-gray-600">Bạn chưa thiết lập địa chỉ giao hàng.</p>
                                    <Link to="#" className="text-sm text-blue-600">Chỉnh sửa địa chỉ</Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {active === "orders" && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Đơn hàng của tôi</h2>
                            <p className="text-gray-600">Bạn chưa có đơn hàng nào.</p>
                        </div>
                    )}

                    {active === "wishlist" && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Danh sách yêu thích</h2>
                            <p className="text-gray-600">Bạn chưa thêm sản phẩm nào vào danh sách yêu thích.</p>
                        </div>
                    )}

                    {active === "newsletter" && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Đăng ký nhận tin</h2>
                            <p className="text-gray-600">Bạn chưa đăng ký nhận bất kỳ bản tin nào.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
