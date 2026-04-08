import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import menImg from "../assets/Men.jpg";
import womenImg from "../assets/Women.jpg";
import kidsImg from "../assets/Kids.jpg";

const categories = [
  { name: "Men", img: menImg, link: "/men" },
  { name: "Women", img: womenImg, link: "/women" },
  { name: "Kids", img: kidsImg, link: "/kids" }
];

const ShopByCategory = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 80,
      duration: 1,
      stagger: 0.3,
      delay: 0.3,
      ease: "power3.out",
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-5xl font-serif text-[#7A0C1E] tracking-wide">
          Shop by Category
        </h2>

         <div className="w-105 h-[2px] bg-[#C6A75E] mx-auto mt-5"></div>


        <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
          Discover curated styles for every generation, blending tradition with modern elegance.
        </p>

        <div className="mt-20 grid md:grid-cols-3 gap-12">
          {categories.map((cat, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => navigate(cat.link)}
              className="relative group overflow-hidden rounded-3xl shadow-lg cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-[540px] object-cover transition duration-700 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition duration-500"></div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-t from-[#7A0C1E]/40 via-transparent to-transparent"></div>

              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-3xl tracking-widest font-serif transform translate-y-6 group-hover:translate-y-0 transition duration-500">
                {cat.name}
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C6A75E] group-hover:w-24 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
