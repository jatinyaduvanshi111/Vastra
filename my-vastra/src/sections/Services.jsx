import { FiTruck, FiRefreshCw, FiShield, FiStar } from "react-icons/fi";

const services = [
  {
    icon: <FiTruck size={28} />,
    title: "Complimentary Express Delivery",
    desc: "Luxury delivered swiftly to your doorstep with care."
  },
  {
    icon: <FiRefreshCw size={28} />,
    title: "Seamless 30-Day Returns",
    desc: "Shop with confidence through our hassle-free return policy."
  },
  {
    icon: <FiShield size={28} />,
    title: "100% Secure Checkout",
    desc: "Your payments are protected with advanced encryption."
  },
  {
    icon: <FiStar size={28} />,
    title: "Authentic Luxury Craftsmanship",
    desc: "Every piece reflects heritage artistry and modern finesse."
  }
];

const Services = () => {
  return (
    <section className="py-12 bg-[#F8F3ED]">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-serif text-[#7A0C1E]">
          The Vastra Experience
        </h2>


        <div className="w-120 h-[2px] bg-[#C6A75E] mx-auto mt-5"></div>

        <p className="text-gray-600 max-w-2xl mx-auto mt-6 mb-10">
          A refined shopping experience designed with elegance, trust, and timeless quality.
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {services.map((item, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2"
            >
              <div className="text-[#7A0C1E] mb-5 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold tracking-wide mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
