import ban from "../assets/Banner.png"
export default function Banner() {
    return (
      <div className="flex justify-center items-center w-full bg-gray-100 ">
        <div className="w-3/5 relative">
          {/* Hình nền */}
          <img
            src={ban} // Thay bằng đường dẫn ảnh của bạn
            alt="RTX 50 Series"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    );
  }
  
  