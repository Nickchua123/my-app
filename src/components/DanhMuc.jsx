const categories = [
    { name: "Laptop", image: "/images/laptop.png" },
    { name: "PC", image: "/images/pc.png" },
    { name: "Màn hình", image: "/images/monitor.png" },
    { name: "Mainboard", image: "/images/mainboard.png" },
    { name: "CPU", image: "/images/cpu.png" },
    { name: "VGA", image: "/images/vga.png" },
    { name: "RAM", image: "/images/ram.png" },
    { name: "Ổ cứng", image: "/images/hdd.png" },
    { name: "Case", image: "/images/case.png" },
    { name: "Tản nhiệt", image: "/images/cooling.png" },
    { name: "Nguồn", image: "/images/psu.png" },
    { name: "Bàn phím", image: "/images/keyboard.png" },
    { name: "Chuột", image: "/images/mouse.png" },
    { name: "Ghế", image: "/images/chair.png" },
    { name: "Tai nghe", image: "/images/headphone.png" },
    { name: "Loa", image: "/images/speaker.png" },
    { name: "Console", image: "/images/console.png" },
    { name: "Phụ kiện", image: "/images/accessories.png" },
    { name: "Thiết bị VP", image: "/images/office.png" },
    { name: "Apple", image: "/images/apple.png" },
  ];
  
  export default function CategoryList() {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-xl font-bold mb-4 border-b-2 border-blue-500 pb-2">
          Danh mục sản phẩm
        </h2>
        <div className="grid grid-cols-10 gap-6 text-center">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-16 h-16 object-contain"
              />
              <span className="mt-2 text-sm">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  