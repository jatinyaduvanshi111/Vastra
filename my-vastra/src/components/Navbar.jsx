import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser
} from "react-icons/fi";
import SideMenu from "../sections/SideMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // 🔥 Sync user login/logout
  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    updateUser();
    window.addEventListener("userChanged", updateUser);

    return () => {
      window.removeEventListener("userChanged", updateUser);
    };
  }, []);

  // 🔥 Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setScrolled(currentScroll > 60);
      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 🔥 Toggle function (MAIN FIX)
  const handleToggle = (path) => {
    if (location.pathname === path) {
      navigate("/"); // close if already open
    } else {
      navigate(path);
    }
  };

  const iconBase =
    "relative text-2xl cursor-pointer transition duration-300";
  const iconHover = "hover:text-[#7A0C1E] hover:scale-110";
  const activeIcon = "text-[#7A0C1E]";

  const genderTabs = ["/men", "/women", "/kids"];
  const showCategoryTabs = genderTabs.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "backdrop-blur-md bg-white/40 border-b border-white/20 shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-2xl hover:text-[#7A0C1E] transition"
          >
            <FiMenu />
          </button>

          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-serif tracking-widest text-[#7A0C1E] cursor-pointer"
          >
            VASTRA
          </h1>
        </div>

        {/* CENTER TABS */}
        {showCategoryTabs && (
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-12">
            {[
              { name: "Men", path: "/men" },
              { name: "Women", path: "/women" },
              { name: "Kids", path: "/kids" }
            ].map((tab) => {
              const isActive = location.pathname.startsWith(tab.path);

              return (
                <div
                  key={tab.name}
                  onClick={() => navigate(tab.path)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <span
                    className={`text-lg tracking-widest font-serif transition duration-300 ${
                      isActive
                        ? "text-[#7A0C1E]"
                        : "text-gray-700 group-hover:text-[#7A0C1E]"
                    }`}
                  >
                    {tab.name}
                  </span>

                  <span
                    className={`h-[2px] bg-[#C6A75E] mt-2 transition-all duration-300 ${
                      isActive ? "w-10" : "w-0 group-hover:w-10"
                    }`}
                  ></span>
                </div>
              );
            })}
          </div>
        )}

        {/* SEARCH */}
        {!showCategoryTabs && (
          <div className="relative w-1/3">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-[#7A0C1E]"
            />
          </div>
        )}

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-8">

          <FiHeart
            onClick={() => handleToggle("/wishlist")}
            className={`${iconBase} ${iconHover} ${
              location.pathname === "/wishlist"
                ? activeIcon
                : scrolled
                ? "text-black"
                : "text-[#7A0C1E]"
            }`}
          />

          <FiShoppingCart
            onClick={() => handleToggle("/cart")}
            className={`${iconBase} ${iconHover} ${
              location.pathname === "/cart"
                ? activeIcon
                : scrolled
                ? "text-black"
                : "text-[#7A0C1E]"
            }`}
          />

          <div className="flex items-center gap-2">
            <FiUser
              onClick={() => handleToggle("/profile")}
              className={`${iconBase} ${iconHover} ${
                location.pathname === "/profile"
                  ? activeIcon
                  : scrolled
                  ? "text-black"
                  : "text-[#7A0C1E]"
              }`}
            />

            {user && (
              <span className="text-sm font-medium text-[#7A0C1E] hidden md:block">
                {user.name}
              </span>
            )}
          </div>

        </div>
      </nav>

      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;