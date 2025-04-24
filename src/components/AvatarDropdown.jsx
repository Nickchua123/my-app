import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

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
    console.log("Current Header là ", currentUser);

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
            <div
                onClick={() => setOpen(!open)}
                className="w-9 h-9 flex items-center justify-center bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white text-1xl font-semibold rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            >
                {currentUser.avatar ? (
                    <img
                        src={
                            currentUser.avatar.startsWith("http")
                                ? currentUser.data.avatar
                                : `http://localhost:8080/storage/user-${currentUser.id}/${currentUser.avatar}`

                        }
                        alt="avatar"
                        className="w-full h-full object-cover rounded-full"
                    />
                ) : (
                    getAvatarLetter(currentUser.name)
                )}
            </div>
            {open && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-48 z-50">
                    <div className="px-4 py-2 text-sm font-medium text-gray-700">
                        👋 {currentUser.name}
                    </div>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                        👤 Thông tin cá nhân
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                        📦 Đơn hàng
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                    >
                        🚪 Đăng xuất
                    </button>
                </div>
            )}
        </div>
    );
}
