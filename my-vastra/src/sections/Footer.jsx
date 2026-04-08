import { FaInstagram, FaPinterestP, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-gray-300 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-serif text-white mb-4">VASTRA</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Where tradition meets modern elegance.  
            Timeless fashion crafted with heritage and luxury.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-white tracking-widest text-sm mb-4">EXPLORE</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* CUSTOMER CARE */}
        <div>
          <h4 className="text-white tracking-widest text-sm mb-4">SUPPORT</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Shipping</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h4 className="text-white tracking-widest text-sm mb-4">CONTACT</h4>
          <p className="text-sm text-gray-400 mb-2">Rewari, Haryana, India</p>
          <p className="text-sm text-gray-400 mb-2">+91 70155 85137</p>
          <p className="text-sm text-gray-400">care@vastra.com</p>

          <div className="flex gap-4 mt-5">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 hover:bg-[#7A0C1E] hover:border-[#7A0C1E] transition">
              <FaInstagram />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 hover:bg-[#7A0C1E] hover:border-[#7A0C1E] transition">
              <FaPinterestP />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 hover:bg-[#7A0C1E] hover:border-[#7A0C1E] transition">
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-14 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} VASTRA. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
