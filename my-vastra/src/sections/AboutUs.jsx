import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hoodieImg from "../assets/hoodie.png";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    tl.from(titleRef.current, {
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    })
      .from(
        textRef.current,
        {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .from(
        imageRef.current,
        {
          x: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.9"
      );
  }, []);

  return (
    <section
      className="px-8 md:px-24 pt-10 pb-24 bg-white font-serif"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">

        {/* LEFT SIDE */}
        <div>

          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-serif text-[#7A0C1E] leading-tight mb-8"
          >
            OUR PHILOSOPHY
          </h2>

          <div className="w-140 h-[2px] bg-[#C6A75E] mb-10"></div>

          <div
            ref={textRef}
            className="text-gray-700 text-lg leading-relaxed space-y-6"
          >
            <p>
              VASTRA celebrates timeless craftsmanship redefined for the modern
              world. Each design reflects heritage artistry elevated with refined,
              contemporary elegance.
            </p>
            <p>
              We collaborate with master artisans, preserve authentic techniques,
              and transform them into silhouettes crafted for today’s generation
              of luxury seekers.
            </p>
            <p>
              Our garments are not simply worn — they are experienced, admired,
              and remembered.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE — FLOATING HOODIE */}
        <div
          ref={imageRef}
          className="relative flex items-center justify-center h-[800px] md:h-[px]"
        >
          <img
            src={hoodieImg}   // ✅ FIXED
            alt="Vastra Luxury Hoodie"
            className="w-[500px] md:w-[520px] lg:w-[600px] xl:w-[650px] hoodie-float"
          />
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
