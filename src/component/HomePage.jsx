import { memo, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DellImage from "../assets/dell.jpg";
import AsusRogImage from "../assets/asus-rog.jpg";
import AsusZenbookImage from "../assets/asus-zenbook.jpg";
import LenovoImage from "../assets/lenovo.jpg";
import Dell from "../assets/dell.jpg";
import { MdCheckCircleOutline } from "react-icons/md";
import Facebook from "../assets/facebook.png";
import Whatsapp from "../assets/whatsapp.png";
import Twitter from "../assets/Twitter-logo.jpg";
import { FaCopy } from "react-icons/fa";

const products = [
  {
    name: "Laptop Lenovo IdeaPad Slim",
    model: "14IRH10 83K00008VN",
    cpu: "Intel Core i5-13420H",
    ram: "16GB DDR5",
    storage: "SSD 512GB",
    priceOld: "$200.00",
    priceNew: "$80.00",
    rating: "4.6/5",
    reviews: 135,
    status: "available",
    image: LenovoImage,
  },
  {
    name: "Laptop Dell Inspiron 14 Plus 7430",
    model: "R1605S",
    cpu: "Intel Core i5-13500H",
    ram: "16GB DDR5",
    storage: "SSD 512GB",
    priceOld: "$200.00",
    priceNew: "$120.00",
    rating: "4.6/5",
    reviews: 135,
    status: "available",
    image: DellImage,
  },
  {
    name: "ASUS ROG Zephyrus G16",
    model: "GA605WV-QR146WS",
    cpu: "AMD Ryzen AI 9 HX 370",
    ram: "32GB DDR5",
    storage: "RTX 4060",
    priceOld: "$200.00",
    priceNew: "$102.00",
    rating: "4.6/5",
    reviews: 135,
    status: "soldout",
    image: AsusRogImage,
  },
  {
    name: "Laptop Asus Zenbook 14 OLED",
    model: "UX3405CA-PZ187WS",
    cpu: "Intel Core Ultra 5 225H",
    ram: "16GB LPDDR5X",
    priceOld: "$200.00",
    priceNew: "$102.00",
    rating: "4.6/5",
    reviews: 135,
    status: "soldout",
    image: AsusZenbookImage,
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    partialVisibilityGutter: 10,
  },
};

//
const HomePage = () => {
  const [cart, setCart] = useState([]);

  //đánh giá

  const [referrals] = useState([]);
  //
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đánh giá của bạn: ${rating} sao\nNội dung: ${comment}`);
    setRating(0);
    setComment("");
  };

  //
  const reviews = [
    {
      id: 1,
      name: "Vikki Starr",
      date: "January 15, 2023",
      rating: 5,
      comment:
        "Yêu TopShelfBC! Giá cả phải chăng với bất kỳ ngân sách và giao hàng nhanh như vậy, thẳng đến cửa của tôi!",
    },
    {
      id: 2,
      name: "Terry Baskey",
      date: "January 15, 2023",
      rating: 5,
      comment: "Giá cả tuyệt vời",
    },
  ];
  //
  const [isDescVisible, setIsDescVisible] = useState(true);
  const [isReviewsVisible, setIsReviewsVisible] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(false);
  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = (product) => {
    if (product.status === "soldout") return;
    setCart([...cart, product]);
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  return (
    <>
      <div className="px-4 py-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Khu vực hiển thị ảnh bên trái */}
          <div className="flex flex-col items-center">
            <img
              src={AsusRogImage}
              alt="Surface Go 3"
              className="w-[460px] h-[300px] rounded-lg shadow object-contain"
              style={{
                imageRendering: "crisp-edges",
              }}
            />

            <div className="flex gap-2 mt-8">
              <img
                src={AsusRogImage}
                alt="Thumbnail 1"
                className="w-16 h-12 rounded-md shadow"
              />
              <img
                src={AsusRogImage}
                alt="Thumbnail 2"
                className="w-16 h-12 rounded-md shadow"
              />
              <img
                src={AsusRogImage}
                alt="Thumbnail 3"
                className="w-16 h-12 rounded-md shadow"
              />
            </div>
          </div>

          {/* Khu vực thông tin sản phẩm bên phải */}
          <div className="space-y-4">
            <h1>
              Microsoft Surface Go 3 Platinum 6500Y - Intel Pentium Gold 6500Y |
              8GB | 10.5 Inch 1920 x 1200
            </h1>
            <div className="border-t my-4"></div>
            <p className="text-gray-600 flex justify-between">
              <span>
                <span className="line-through text-red-400">$200.00</span> -
                <span className="font-bold text-green-600">$102.00</span>
              </span>

              <span>
                <span className="text-yellow-500">⭐ 4.6/5 </span> -
                <span className="text-gray-500">135 reviews</span>
              </span>
            </p>

            <div className="border-t my-4"></div>
            <h3>Hiệu năng</h3>
            <p>
              Surface Go 3 với Intel Pentium Gold 6500Y và 8GB RAM có hiệu năng
              trung bình, phù hợp cho tác vụ văn phòng, lướt web, nhưng không
              mạnh cho đa nhiệm nặng hay đồ họa.
            </p>
            <h3>Lợi ích</h3>
            <p>
              Nhỏ gọn, màn hình đẹp, pin tốt, chạy Windows đầy đủ, phù hợp cho
              công việc di động và học tập.
            </p>
            <h3>Giá cả</h3>
            <p>Hợp lý, rẻ, xứng đáng 5 sao.</p>
            <h4>SỰ MIÊU TẢ</h4>
            <p>
              Surface Go 3 là laptop 2-in-1 nhỏ gọn, màn hình 10.5 inch sắc nét,
              chạy Windows, phù hợp cho công việc và giải trí nhẹ.
            </p>
            <div className="border-t my-4"></div>
            <h4>Cấu hình</h4>
            <ul className="list-none text-gray-700 flex flex-col items-center">
              <li>Intel Pentium Gold 6500Y</li>
              <li>8GB LPDDR3 RAM</li>
              <li>SSD 128GB NVMe</li>
              <li>Intel UHD Graphics 615</li>
              <li>10.5 inch 1920 x 1280 (220 PPI)</li>
            </ul>

            <div className="border-t my-4"></div>
            <span className="text-gray-500">Giá cả </span>
            <span className="font-bold text-green-600">$102.00</span>
            <div className="flex items-center gap-4 mt-4">
              <button id="decrease">-</button>
              <input type="number" id="quantity" value="1" min="1" />
              <button id="increase">+</button>
            </div>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Thêm vào giỏ hàng
            </button>
            <div className="border-t my-4"></div>
            <div>
              {/* Các Button */}
              <div className="w-full flex justify-between gap-4">
                <button
                  className={`desc-btn ${
                    isDescVisible ? "active" : ""
                  } border rounded-lg p-4 w-full hover:bg-gray-300`}
                  onClick={() => {
                    setIsDescVisible(true);
                    setIsReviewsVisible(false);
                    setIsIntroVisible(false);
                  }}
                >
                  Mô tả
                </button>
                <button
                  className={`desc-btn ${
                    isReviewsVisible ? "active" : ""
                  } border rounded-lg p-4 w-full hover:bg-gray-300`}
                  onClick={() => {
                    setIsDescVisible(false);
                    setIsReviewsVisible(true);
                    setIsIntroVisible(false);
                  }}
                >
                  Đánh giá (350)
                </button>
                <button
                  className={`desc-btn ${
                    isIntroVisible ? "active" : ""
                  } border rounded-lg p-4 w-full hover:bg-gray-300`}
                  onClick={() => {
                    setIsDescVisible(false);
                    setIsReviewsVisible(false);
                    setIsIntroVisible(true);
                  }}
                >
                  Giới thiệu với bạn
                </button>
              </div>

              {/* Danh sách li */}
              <div className="border-t my-4"></div>
              <div className="text-sm mt-4 text-gray-700">
                <ul>
                  <li>
                    <MdCheckCircleOutline />
                    Xpress vận chuyển miễn phí trên các đơn đặt hàng $149
                  </li>
                  <li>
                    <MdCheckCircleOutline />
                    Đặt hàng trước 12:00 tối cho cùng ngày công nhận
                  </li>
                  <li>
                    <MdCheckCircleOutline />
                    Hỗ trợ và đặt hàng mở 7 ngày một tuần
                  </li>
                </ul>
              </div>
              <div className="border-t my-4"></div>

              {/* Nội dung hiển thị tùy thuộc vào button đã chọn */}
              {isDescVisible && (
                <div className="mt-6 space-y-4 text-gray-700">
                  <p>
                    Surface Go 3 là chiếc laptop/ máy tính xách tay ấn tượng đến
                    từ "ông vua công nghệ" Microsoft. Chiếc laptop mỏng nhẹ này
                    sở hữu thiết kế 2 in 1 siêu sang chảnh và tiện lợi, nhưng
                    vẫn có đủ sức mạnh đáp ứng tốt các tác vụ công việc, sáng
                    tạo.
                  </p>
                  <ul>
                    <li>
                      Thiết kế cao cấp, cực sang với build kim loại. Nhỏ gọn chỉ
                      544 gram dễ dàng bỏ vào túi xách mang đi bất cứ đâu.
                    </li>
                    <li>
                      Màn hình 10.5 inch, độ phân giải Full HD (1920x1280) tương
                      đương với chất lượng màn 2K+ ở những chiếc laptop 15.6
                      inch cực sống động và sắc nét.
                    </li>
                    <li>
                      Cảm ứng nhạy thuận tiện cho công việc, giải trí. Khi tháo
                      rời phím, màn hình có thể xoay ngang, xoay dọc, linh hoạt
                      trong mục đích sử dụng.
                    </li>
                    <li>
                      Cấu hình Intel Pentium Gold 6500Y, RAM 8GB và SSD 128GB
                      giúp máy có thể đáp ứng tốt và mượt nhu cầu giải trí và
                      làm việc cơ bản.
                    </li>
                  </ul>
                </div>
              )}

              {isReviewsVisible && (
                <div className="mt-6 space-y-6">
                  <div className="review-list">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-100 p-4 rounded shadow-sm"
                      >
                        <div className="flex justify-between">
                          <strong>{review.name}</strong>
                          <span>{review.date}</span>
                        </div>
                        {/* Nếu bạn chưa có component Rating, có thể làm như thế này */}
                        <div className="text-yellow-500">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={
                                i < review.rating ? "star filled" : "star"
                              }
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  <form
                    className="review-form p-4 border rounded shadow bg-white w-full"
                    onSubmit={handleSubmit}
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      Đánh giá của bạn
                    </h3>

                    <div className="rating text-yellow-500 mb-2">
                      <div className="star-rating flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`cursor-pointer text-3xl ${
                              star <= rating
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }`}
                            onClick={() => setRating(star)}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    <textarea
                      className="w-full h-40 p-3 border rounded resize-none"
                      placeholder="Nhập đánh giá của bạn..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />

                    <button
                      type="submit"
                      className="w-full mt-3 p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Nộp
                    </button>
                  </form>
                </div>
              )}

              {/* Chương trình giới thiệu */}
              {isIntroVisible && (
                <div className="mt-6 space-y-6">
                  <div className="p-6 bg-white border rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">
                      Chương trình giới thiệu
                    </h2>

                    <div className="referral-codes space-y-4">
                      <div className="bg-gray-100 p-4 rounded shadow">
                        <p className="font-semibold">Giới thiệu URL của bạn</p>
                        <p className="flex items-center justify-between">
                          Mã giới thiệu chỉ có sẵn cho người dùng có ít nhất một
                          đơn đặt hàng.
                          <FaCopy className="text-blue-500 cursor-pointer" />
                        </p>
                      </div>

                      <div className="bg-gray-100 p-4 rounded shadow">
                        <p className="font-semibold">
                          Mã phiếu giảm giá của bạn để chia sẻ
                        </p>
                        <p className="flex items-center justify-between">
                          Mã giới thiệu chỉ có sẵn cho người dùng có ít nhất một
                          đơn đặt hàng.
                          <FaCopy className="text-blue-500 cursor-pointer" />
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-gray-50 rounded shadow space-y-2">
                      <h3 className="font-semibold">Chia sẻ qua mạng xã hội</h3>
                      <div className="flex gap-4">
                        <button className="flex items-center gap-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                          <img src={Facebook} alt="" className="w-6 h-6" />
                          Facebook
                        </button>
                        <button className="flex items-center gap-2 p-2 bg-blue-400 text-white rounded hover:bg-blue-500">
                          <img src={Twitter} alt="" className="w-6 h-6" />
                          Twitter
                        </button>
                        <button className="flex items-center gap-2 p-2 bg-green-500 text-white rounded hover:bg-green-600">
                          <img src={Whatsapp} alt="" className="w-6 h-6" />
                          Whatsapp
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-white border rounded shadow space-y-3">
                      <h3 className="font-semibold">Chia sẻ qua email</h3>
                      <form className="space-y-3">
                        <div>
                          <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            className="w-full p-2 border rounded"
                          />
                          <h6 className="text-sm text-gray-500">
                            VD: daytrun1a@gmail.com
                          </h6>
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Nhập họ và tên của bạn"
                            className="w-full p-2 border rounded"
                          />
                          <h6 className="text-sm text-gray-500">
                            VD: Phạm Văn Lưu
                          </h6>
                        </div>
                        <button
                          type="submit"
                          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Gửi Email
                        </button>
                      </form>
                    </div>

                    <div className="mt-4 p-4 rounded shadow">
                      <ul className="list-disc pl-5 space-y-2">
                        {referrals.map((referral) => (
                          <li key={referral.id}>
                            {referral.name} - {referral.email}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t my-4"></div>
      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Sản phẩm nổi bật</h2>
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          className="mx-auto"
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="carousel-item flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md mt-6"
              // Thêm mt-6 để tạo khoảng cách giữa các item
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-60 h-40 object-contain mb-3"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.model}</p>
              <p className="text-sm text-gray-700">
                {product.cpu} | {product.ram} | {product.storage}
              </p>
              <p className="text-yellow-500 text-sm">
                ⭐ {product.rating} | {product.reviews} đánh giá
              </p>
              <p className="mt-2 text-lg">
                <span className="line-through text-gray-400 mr-2">
                  {product.priceOld}
                </span>
                <span className="font-bold text-green-600">
                  {product.priceNew}
                </span>
              </p>
              {product.status === "available" ? (
                <button
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition w-4/5"
                  onClick={() => handleAddToCart(product)}
                >
                  Thêm vào giỏ hàng
                </button>
              ) : (
                <span className="mt-4 text-red-500 font-medium">Hết hàng</span>
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default memo(HomePage);
