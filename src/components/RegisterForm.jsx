export default function RegisterForm({ handleRegister, switchToLogin }) {
  return (
    <form onSubmit={handleRegister} className="space-y-5 text-base md:text-lg">
      <div className="space-y-2">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Tên của bạn</label>
        <input
          type="text"
          placeholder="Nguyễn Văn A"
          required
          className="w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          required
          className="w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold">Mật khẩu</label>
        <input
          type="password"
          placeholder="Tạo mật khẩu"
          required
          className="w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300 font-semibold"
      >
        Đăng ký
      </button>
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Bạn đã có tài khoản?{' '}
        <button
          type="button"
          onClick={switchToLogin}
          className="text-blue-600 hover:underline font-medium"
        >
          Đăng nhập!
        </button>
      </div>
    </form>
  );
}
