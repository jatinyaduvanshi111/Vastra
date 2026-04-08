import { useNavigate, useLocation } from "react-router-dom";

const SideMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50">
      <div className="w-80 h-full bg-white p-8 shadow-xl flex flex-col">

        <button
          onClick={onClose}
          className="mb-10 text-sm tracking-wide hover:text-gray-500 transition self-start"
        >
          ✕
        </button>

        {/* MENU ITEMS */}
        <ul className="space-y-4 mt-6 flex-1">
          <MenuItem label="Home" path="/" location={location} onClick={handleNav} />
          <MenuItem label="About Us" path="/about" location={location} onClick={handleNav} />
          <MenuItem label="Services" path="/services" location={location} onClick={handleNav} />
          <MenuItem label="Contact" path="/contact" location={location} onClick={handleNav} />
        </ul>

        {/* BRAND NAME + TAGLINE */}
        <div className="text-center mt-10">
          <h2 className="text-2xl font-serif tracking-widest text-[#7A0C1E]">
            VASTRA
          </h2>
          <p className="text-xs tracking-[0.3em] text-gray-500 mt-2">
            WHERE FASHION MEETS TRADITION
          </p>
        </div>

      </div>
    </div>
  );
};

export default SideMenu;

const MenuItem = ({ label, path, location, onClick }) => {
  const isActive = location.pathname === path;

  return (
    <div
      onClick={() => onClick(path)}
      className={`px-6 py-4 rounded-xl cursor-pointer transition font-medium text-center
        ${isActive
          ? "bg-[#7A0C1E] text-white shadow-md"
          : "bg-[#FDF8F3] text-black hover:bg-[#f3eae2]"}`}
    >
      {label}
    </div>
  );
};
