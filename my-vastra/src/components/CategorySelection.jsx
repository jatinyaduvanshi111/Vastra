import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

export default function CategorySelection({ title, subcategories }) {
  const navigate = useNavigate();

  // 20 demo realistic products
  const products = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    name: "Premium Ethnic Wear",
    price: 4999 + i * 300,
    discount: 20,
    img: `https://source.unsplash.com/600x800/?indian,ethnic,fashion&sig=${i}`,
    link: "https://www.flipkart.com", // Buy Now redirect
  }));

  return (
    <div className="bg-[#F9F6F1] min-h-screen text-[#2B2B2B]">

      {/* ===== PAGE TITLE ONLY ===== */}
      <div className="pt-32 pb-12 text-center">
        <h1 className="text-4xl font-serif text-[#7A0C1E] tracking-widest uppercase">
          {title} Collection
        </h1>
        <div className="w-16 h-[2px] bg-[#C6A75E] mx-auto mt-4"></div>
      </div>

      {/* ===== SUB CATEGORIES (5 BOXES) ===== */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-6 mb-20">
        {subcategories.map((cat, i) => (
          <div
            key={i}
            onClick={() => navigate(cat.link)}
            className="border border-[#E8DFC8] py-6 text-center cursor-pointer hover:bg-[#7A0C1E] hover:text-white transition duration-300"
          >
            <p className="tracking-widest font-serif text-sm">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* ===== PRODUCTS GRID (20 PRODUCTS) ===== */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {products.map((item) => (
            <div key={item.id} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-500 overflow-hidden">

              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-700"
                />

                {/* DISCOUNT BADGE */}
                <span className="absolute top-3 left-3 bg-[#7A0C1E] text-white text-xs px-2 py-1">
                  {item.discount}% OFF
                </span>

                {/* WISHLIST */}
                <FiHeart className="absolute top-3 right-3 text-white text-xl cursor-pointer hover:text-red-500" />
              </div>

              {/* DETAILS */}
              <div className="p-4 text-center">
                <h3 className="font-serif text-sm text-[#7A0C1E]">{item.name}</h3>

                <p className="mt-2 text-[#C6A75E] font-semibold">
                  ₹{item.price}
                </p>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 border border-[#7A0C1E] text-[#7A0C1E] py-2 text-xs hover:bg-[#7A0C1E] hover:text-white transition">
                    <FiShoppingCart className="inline mr-1" /> Cart
                  </button>

                  <button
                    onClick={() => window.open(item.link, "_blank")}
                    className="flex-1 bg-[#C6A75E] text-white py-2 text-xs hover:opacity-90 transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
