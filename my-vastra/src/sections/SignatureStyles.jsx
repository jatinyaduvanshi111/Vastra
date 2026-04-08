import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion"; // ✅ added

// 🔽 IMPORT YOUR LOCAL PNG IMAGES
import sig1 from "../assets/SignatureStyles1.png";
import sig2 from "../assets/SignatureStyles2.png";
import sig3 from "../assets/SignatureStyles3.png";
import sig4 from "../assets/SignatureStyles4.png";

const products = [
  {
    name: " AUSBLICK Men Cotton Silk Kurta Set ",
    price: "₹2,499",
    img: sig1,
    flipkartUrl: "https://dl.flipkart.com/s/!7AKdRNNNN",
  },
  {
    name: "Embroidered Semi Stitched Lehenga Choli",
    price: "₹3,999",
    img: sig2,
    flipkartUrl: "https://dl.flipkart.com/s/TlN8D2uuuN",
  },
  {
    name: " Women Viscose Rayon Kurta Palazzo Set",
    price: "₹2,995",
    img: sig3,
    flipkartUrl: "https://dl.flipkart.com/s/!W3K!6NNNN",
  },
  {
    name: "Men Spread Collar Printed Shirt",
    price: "₹1,199",
    img: sig4,
    flipkartUrl: "https://dl.flipkart.com/s/!WBjLdNNNN",
  },
];

const SignatureStyles = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: 0.2,
      delay: 0.2,
      ease: "power3.out",
    });
  }, []);

  const toggleWishlist = (index) => {
    setWishlist((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const handleBuyNow = (url) => {
    window.open(url, "_blank");
  };

  return (
    <section ref={sectionRef} className="py-28 bg-[#F5EFE6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif text-[#7A0C1E]">
            Signature Styles
          </h2>
         <div className="w-100 h-[2px] bg-[#C6A75E] mx-auto mt-5"></div>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((item, index) => {
            const isWishlisted = wishlist.includes(index);

            return (
              <motion.div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0., delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: -1 }}
                className="relative bg-white border border-[#eee] hover:shadow-[0_0_35px_rgba(198,167,94,0.35)] transition duration-500"
              >
                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-[400px] object-cover"
                  />
                </div>

                {/* INFO */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#222]">
                    {item.name}
                  </h3>
                  <p className="text-[#C6A75E] font-semibold mt-1">
                    {item.price}
                  </p>

                  <div className="mt-4 h-[1px] bg-gray-200"></div>

                  {/* BUTTONS */}
                  <div className="mt-4 flex gap-3">
                    <button className="flex-1 border border-[#7A0C1E] text-[#7A0C1E] py-2 text-xs tracking-widest hover:bg-[#7A0C1E] hover:text-white transition">
                      ADD TO CART
                    </button>

                    <button
                      onClick={() => handleBuyNow(item.flipkartUrl)}
                      className="flex-1 bg-[#C6A75E] text-black py-2 text-xs tracking-widest hover:bg-[#b89347] transition"
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>

                {/* WISHLIST ICON */}
                <button
                  onClick={() => toggleWishlist(index)}
                  className="absolute top-4 right-4 text-[#7A0C1E] transition"
                >
                  {isWishlisted ? (
                    <FaHeart size={18} className="text-[#7A0C1E]" />
                  ) : (
                    <FiHeart size={18} />
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SignatureStyles;
