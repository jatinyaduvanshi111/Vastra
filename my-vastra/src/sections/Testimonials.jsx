import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar } from "react-icons/fa";

import testimonial1 from "../assets/Testimonial1.jpeg";
import testimonial2 from "../assets/Testimonial2.jpeg";
import testimonial3 from "../assets/Testimonial3.jpeg";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Elvish Yadav",
    image: testimonial1,
    rating: 5,
    text: "Wearing VASTRA feels like carrying heritage with modern elegance. The detailing is simply breathtaking.",
  },
  {
    name: "Shraddha Kapoor",
    image: testimonial2,
    rating: 5,
    text: "Every piece tells a story. The craftsmanship and fabric quality are on a completely different level.",
  },
  {
    name: "Jaideep Ahlawat",
    image: testimonial3,
    rating: 5,
    text: "Luxury, tradition, and sophistication — VASTRA blends them flawlessly. Truly timeless fashion.",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    tl.from(titleRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }).from(
      cardsRef.current,
      {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      },
      "-=0.6"
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F9F6F1] py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-serif text-[#7A0C1E]"
        >
          Loved by Connoisseurs
        </h2>

        <div className="w-155 h-[2px] bg-[#C6A75E] mx-auto mt-6 mb-16"></div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="backdrop-blur-md bg-white/70 border border-[#C6A75E] shadow-xl rounded-3xl p-10 text-center  hover:-translate-y-4 hover:shadow-2xl"
            >
              {/* Client Photo */}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-6 border-4 border-[#C6A75E] shadow-md"
              />

              {/* Rating */}
              <div className="flex justify-center gap-1 text-[#C6A75E] mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                “{item.text}”
              </p>

              <div className="w-12 h-[2px] bg-[#C6A75E] mx-auto mb-4"></div>

              {/* Name */}
              <h4 className="text-[#7A0C1E] font-semibold tracking-wide">
                {item.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
