export default function RegisterForm({ handleRegister }) {
    return (
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Tên của bạn"
          required
          className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          required
          className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Đăng ký
        </button>
      </form>
    );
  }
  