import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import heroImg from "../assets/hero.png";

const Home = () => {
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const btnRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(imgRef.current, {
      scale: 1.05,
      opacity: 0,
      duration: 1.6,
      ease: "power3.out",
    })
      .from(
        titleRef.current,
        {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=1"
      )
      .from(
        taglineRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 1,
        },
        "-=0.7"
      )
      .from(
        btnRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      );
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-white font-serif">
      {/* RIGHT SIDE IMAGE */}
      <div className="absolute right-0 top-0 h-full w-full flex justify-end items-end">
        <img
          ref={imgRef}
          src={heroImg}
          alt="Luxury Fashion Family"
          className="h-[105%] w-auto object-contain drop-shadow-xl"
        />
      </div>

      {/* LEFT FADE */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

      {/* TEXT */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-24 max-w-2xl">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl text-[#7A0C1E] tracking-wide"
        >
          VASTRA
        </h1>

        <div className="w-100 h-[2px] bg-[#C6A75E] mt-6"></div>

        <p
          ref={taglineRef}
          className="mt-6 text-2xl text-[#6B4F3B] font-light"
        >
          Where Fashion Meets Tradition
        </p>

        {/* BUTTONS */}
        <div ref={btnRef} className="mt-10 flex gap-6 flex-wrap">
          <button className="bg-[#C6A75E] text-white px-10 py-4 rounded-full tracking-widest text-sm shadow-lg hover:scale-105 hover:shadow-[0_0_25px_rgba(198,167,94,0.6)] transition">
            SHOP NOW
          </button>

          {/* ✅ UPDATED BUTTON */}
          <button
            onClick={() => navigate("/getinspired")}
            className="border border-[#C6A75E] text-[#7A0C1E] px-10 py-4 rounded-full tracking-widest text-sm hover:bg-[#C6A75E] hover:text-white transition"
          >
            Get Inspired
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;