import { memo, useState } from "react";
import "./style.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DellImage from "../../../assets/dell.jpg";
import AsusRogImage from "../../../assets/asus-rog.jpg";
import AsusZenbookImage from "../../../assets/asus-zenbook.jpg";
import LenovoImage from "../../../assets/lenovo.jpg";
import Dell from "../../../assets/dell.jpg";
import { MdCheckCircleOutline } from "react-icons/md";
import Facebook from "../../../assets/facebook.png";
import Whatsapp from "../../../assets/whatsapp.png";
import Twitter from "../../../assets/Twitter-logo.jpg";
import { FaCopy } from "react-icons/fa";

const products = [
  {
    name: "Laptop Lenovo IdeaPad Slim 3",
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
      <div className="container">
        <div className="product">
          {/* Khu vực hiển thị ảnh bên trái */}
          <div className="product-images">
            <img src={Dell} alt="Surface Go 3" className="main-image" />
            <div className="thumbnails">
              <img src={Dell} alt="Thumbnail 1" />
              <img src={Dell} alt="Thumbnail 2" />
              <img src={Dell} alt="Thumbnail 3" />
            </div>
          </div>

          {/* Khu vực thông tin sản phẩm bên phải */}
          <div className="product-info">
            <h2>Bảo Hành Hậu Đãi</h2>
            <h1>
              Microsoft Surface Go 3 Platinum 6500Y - Intel Pentium Gold 6500Y |
              8GB | 10.5 Inch 1920 x 1200
            </h1>
            <div className="divider"></div>
            <p className="price-info">
              <span className="price-old">$200.00</span> -
              <span className="price-new">$102.00</span>
              <span className="rating">⭐ 4.6/5 </span> -
              <span className="reviews">135 reviews</span>
            </p>
            <div className="divider"></div>
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
            <div className="divider"></div>
            <h4>Cấu hình</h4>
            <ul className="specs">
              <li>Intel Pentium Gold 6500Y</li>
              <li>8GB LPDDR3 RAM</li>
              <li>SSD 128GB NVMe</li>
              <li>Intel UHD Graphics 615</li>
              <li>10.5 inch 1920 x 1280 (220 PPI)</li>
              <li>Không bao gồm BÀN PHÍM SURFACE GO PLATINUM</li>
            </ul>
            <div className="divider"></div>
            <span className="reviews">Giá cả</span>
            <span className="price-new">$102.00</span>
            <div className="quantity">
              <button id="decrease">-</button>
              <input type="number" id="quantity" value="1" min="1" />
              <button id="increase">+</button>
            </div>
            <button className="add-to-cart">Thêm vào giỏ hàng</button>
            <div className="divider"></div>
            <div>
              {/* Các Button */}
              <div className="buttons">
                <button
                  className={`desc-btn ${isDescVisible ? "active" : ""}`}
                  onClick={() => {
                    setIsDescVisible(true);
                    setIsReviewsVisible(false);
                    setIsIntroVisible(false);
                  }}
                >
                  Mô tả
                </button>
                <button
                  className={`desc-btn ${isReviewsVisible ? "active" : ""}`}
                  onClick={() => {
                    setIsDescVisible(false);
                    setIsReviewsVisible(true);
                    setIsIntroVisible(false);
                  }}
                >
                  Đánh giá (350)
                </button>
                <button
                  className={`desc-btn ${isIntroVisible ? "active" : ""}`}
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
              <div className="divider"></div>
              <div className="extra-info">
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
              <div className="divider"></div>

              {/* Nội dung hiển thị tùy thuộc vào button đã chọn */}
              {isDescVisible && (
                <div className="product-description">
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
                <div className="reviews-section">
                  <div className="review-list">
                    {reviews.map((review) => (
                      <div key={review.id} className="review-card">
                        <div className="review-header">
                          <strong>{review.name}</strong>
                          <span>{review.date}</span>
                        </div>
                        {/* Nếu bạn chưa có component Rating, có thể làm như thế này */}
                        <div className="rating">
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

                  <form className="review-form" onSubmit={handleSubmit}>
                    <h3>Đánh giá của bạn</h3>
                    <div className="rating">
                      <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={star <= rating ? "star filled" : "star"}
                            onClick={() => setRating && setRating(star)}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <textarea
                      placeholder="Nhập đánh giá của bạn"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                    <button type="submit">Nộp</button>
                  </form>
                </div>
              )}

              {/* Chương trình giới thiệu */}
              {isIntroVisible && (
                <div className="intro-section">
                  <div className="referral-section">
                    <h2>Chương trình giới thiệu</h2>

                    <div className="referral-codes">
                      <div className="referral-box">
                        <p>
                          <strong>Giới thiệu URL của bạn</strong>
                        </p>
                        <p>
                          Mã giới thiệu chỉ có sẵn cho người dùng có ít nhất một
                          đơn đặt hàng.
                          <FaCopy className="referral-box__icon" />
                        </p>
                      </div>
                      <div className="referral-box">
                        <p>
                          <strong>Mã phiếu giảm giá của bạn để chia sẻ</strong>
                        </p>
                        <p>
                          Mã giới thiệu chỉ có sẵn cho người dùng có ít nhất một
                          đơn đặt hàng.
                          <FaCopy className="referral-box__icon" />
                        </p>
                      </div>
                    </div>

                    <div className="share-options">
                      <button>
                        <img
                          src={Facebook}
                          alt=""
                          className="share-options__icon"
                        />
                        Chia sẻ qua Facebook
                      </button>
                      <button>
                        <img
                          src={Twitter}
                          alt=""
                          className="share-options__icon"
                        />
                        Chia sẻ qua Twitter
                      </button>
                      <button>
                        <img
                          src={Whatsapp}
                          alt=""
                          className="share-options__icon"
                        />
                        Chia sẻ qua Whatsapp
                      </button>
                    </div>

                    <div className="email-share">
                      <h3>Hoặc chia sẻ qua email</h3>
                      <form>
                        <input type="email" placeholder="Nhập email của bạn" />
                        <h6>VD: daytrun1a@gmail.com</h6>
                        <input
                          type="text"
                          placeholder="Nhập họ và tên của bạn"
                        />
                        <h6>VD: Phạm Văn Lưu</h6>
                        <button type="submit">Gửi Email</button>
                      </form>
                      <ul>
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

      <div className="divider"></div>
      <div className="carousel-container">
        <h2>Sản phẩm nổi bật</h2>
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
        >
          {products.map((product, index) => (
            <div key={index} className={`carousel-item ${product.status}`}>
              <div className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  style={{
                    width: "250px",
                    height: "150px",
                    objectFit: "contain",
                  }}
                />
                <h3>{product.name}</h3>
                <p className="model">{product.model}</p>
                <p className="specs">
                  {product.cpu} | {product.ram} | {product.storage}
                </p>
                <p className="rating">
                  ⭐ {product.rating} | {product.reviews} đánh giá
                </p>
                <p className="price">
                  <span className="old-price">{product.priceOld}</span>
                  <span className="new-price">{product.priceNew}</span>
                </p>
                {product.status === "available" ? (
                  <button
                    className="btn-add-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                ) : (
                  <span className="sold-out">Hết hàng</span>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default memo(HomePage);
