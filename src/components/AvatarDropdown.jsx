import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { User, Package, LogOut } from "lucide-react";

export default function AvatarDropdown() {
    const { currentUser, logout } = useUser();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const getAvatarLetter = (name) => name?.charAt(0)?.toUpperCase() || "U";

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!currentUser) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Avatar */}
            <div
                onClick={() => setOpen(!open)}
                className="w-7 h-7 flex items-center justify-center bg-gradient-to-tr from-blue-400 via-blue-500 to-blue-500 text-white font-semibold rounded-full cursor-pointer shadow-md hover:scale-105 transition-transform duration-200"
            >
                {currentUser.avatar ? (
                    <img
                        src={
                            currentUser.avatar.startsWith("http")
                                ? currentUser.avatar
                                : `http://localhost:8080/storage/user-${currentUser.id}/${currentUser.avatar}`
                        }
                        alt="avatar"
                        className="w-full h-full object-cover rounded-full"
                    />
                ) : (
                    <span className="text-lg">{getAvatarLetter(currentUser.name)}</span>
                )}
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                    {/* User greeting */}
                    <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-700">
                        Chào, {currentUser.name}
                    </div>

                    {/* Links */}
                    <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                    >
                        <User size={16} /> Thông tin cá nhân
                    </Link>
                    <Link
                        to="/my-orders"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                    >
                        <Package size={16} /> Đơn hàng
                    </Link>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                    >
                        <LogOut size={16} /> Đăng xuất
                    </button>
                </div>
            )}
        </div>
    );
}
