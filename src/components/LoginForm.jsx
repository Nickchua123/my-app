export default function LoginForm({ handleLogin, switchToRegister, switchToForgot }) {
  return (
    <form onSubmit={handleLogin} className="space-y-5 text-base md:text-lg">
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
          placeholder="Nhập mật khẩu"
          required
          className="w-full py-3 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white"
        />
        <div className="text-right">
          <button
            type="button"
            onClick={switchToForgot}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            Quên mật khẩu?
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300 font-semibold"
      >
        Đăng nhập
      </button>
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Bạn chưa có tài khoản?{' '}
        <button
          type="button"
          onClick={switchToRegister}
          className="text-blue-600 hover:underline font-medium"
        >
          Đăng ký ngay!
        </button>
      </div>
    </form>
  );
}