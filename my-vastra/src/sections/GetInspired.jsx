import { useEffect, useRef } from "react";
import gsap from "gsap";

import urbanminimal from "../assets/UrbanMinimal.jpg";
import streetedge from "../assets/StreetEdge.jpg";
import modernethnic from "../assets/ModernEthnic.jpg";
import festivemood from "../assets/FestiveMood.jpg";

const GetInspired = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.from(".inspire-card", {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  const styles = [
    {
      title: "Urban Minimal",
      text: "Effortless everyday fashion",
      img: urbanminimal,
    },
    {
      title: "Street Edge",
      text: "Bold modern streetwear",
      img: streetedge,
    },
    {
      title: "Modern Ethnic",
      text: "Tradition meets contemporary",
      img: modernethnic,
    },
    {
      title: "Festive Mood",
      text: "Celebrate with statement looks",
      img: festivemood,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="px-8 md:px-24 pt-10 pb-24 bg-white font-serif"
    >
      {/* TITLE */}
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl text-[#7A0C1E] tracking-wide">
          Get Inspired
        </h1>
        
        <div className="w-90 h-[2px] bg-[#C6A75E] mt-6"></div>

        <p className="text-[#6B4F3B] text-lg mt-4 max-w-xl">
          Discover styling ideas and fashion moments curated by Vastra.
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {styles.map((item, index) => (
          <div
            key={index}
            className="inspire-card group cursor-pointer hover:outline-[#D4AF37] hover:scale-[1.02]"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-[380px] object-cover object-top transition duration-500 group-hover:scale-110"
              />
            </div>

            <h3 className="text-xl mt-4 text-[#7A0C1E]">
              {item.title}
            </h3>

            <p className="text-[#6B4F3B] text-sm">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GetInspired;