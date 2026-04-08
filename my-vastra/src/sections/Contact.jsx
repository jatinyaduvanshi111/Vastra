import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Particles from "react-tsparticles";
import emailjs from "@emailjs/browser";
import featherImg from "../assets/feather.png";

const Contact = () => {
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const featherRef = useRef(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(formRef.current, {
      x: 80,
      opacity: 0,
      duration: 1.2,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.to(featherRef.current, {
      y: -50,
      rotation: 8,
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: "sine.inOut",
    });
  }, []);

  // Auto-hide success message after 4 seconds
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => setStatus(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    const templateParams = {
      name: formRef.current.name.value,
      email: formRef.current.email.value,
      message: formRef.current.message.value,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("success");
          formRef.current.reset();
        },
        () => setStatus("error")
      );
  };

  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div className="relative h-[340px] md:h-[420px] flex items-center justify-center">
          <Particles
            className="absolute inset-0 z-0"
            options={{
              fullScreen: { enable: false },
              particles: {
                number: { value: 70 },
                color: { value: "#C6A75E" },
                shape: { type: "circle" },
                opacity: { value: 0.55, random: true },
                size: { value: { min: 2, max: 6 } },
                move: { enable: true, speed: 1, random: true },
              },
            }}
          />
          <img
            ref={featherRef}
            src={featherImg}
            alt="Luxury Feather"
            className="relative z-10 h-[420px] md:h-[520px] w-auto max-w-none drop-shadow-[0_40px_70px_rgba(0,0,0,0.3)]"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div>
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-serif text-[#7A0C1E] mb-8"
          >
            Start Your Style Journey
          </h2>

          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="space-y-4 bg-[#FAF7F2] p-8 rounded-3xl shadow-lg"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C6A75E] transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C6A75E] transition"
            />

            <textarea
              rows="4"
              name="message"
              placeholder="Your Message"
              required
              className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C6A75E] transition"
            ></textarea>

            {/* STATUS MESSAGE */}
            {status && (
              <p
                className={`text-sm font-medium ${
                  status === "success"
                    ? "text-[#C6A75E]"
                    : status === "error"
                    ? "text-red-500"
                    : "text-yellow-600"
                }`}
              >
                {status === "sending" && "Sending..."}
                {status === "success" && "Message sent successfully ✨"}
                {status === "error" && "Something went wrong ❌"}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[#7A0C1E] text-white py-3 rounded-full tracking-widest text-sm transition duration-300 hover:shadow-[0_0_20px_rgba(122,12,30,0.5)] hover:-translate-y-1 disabled:opacity-60"
            >
              {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
