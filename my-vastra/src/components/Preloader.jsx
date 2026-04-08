import { useEffect, useRef, useState } from "react";

const Preloader = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 1000);
    }, 5200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  // Gold particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const numParticles = 120;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.7 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.3;
      }
      update() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(212,175,55,${this.opacity})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#F8F5F0] transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative flex flex-col items-center">

        {/* ULTRA LUXURY V */}
        <h1 className="luxury-v-text">V</h1>

        {/* PREMIUM BRAND NAME */}
        <p className="luxury-brand-text">VASTRA</p>

        <div className="luxury-line" />
      </div>
    </div>
  );
};

export default Preloader;
