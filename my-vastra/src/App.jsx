import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";

import Home from "./sections/Home";
import GetInspired from "./sections/GetInspired"; 
import Profile from "./sections/Profile";
import Cart from "./sections/Cart";
import Wishlist from "./sections/Wishlist";
import Services from "./sections/Services";
import Features from "./sections/Features";
import SignatureStyles from "./sections/SignatureStyles";
import AboutUs from "./sections/AboutUs";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

import MenCategories from "./sections/MenCategories";
import WomenCategories from "./sections/WomenCategories";
import KidsCategories from "./sections/KidsCategories";
import MenProducts from "./sections/MenProducts";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      {!loading && (
        <>
          <Navbar />

          <div className="pt-19">
            <Routes>
              {/* HOME */}
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <Services />
                    <Features />
                    <SignatureStyles />
                    <AboutUs />
                    <Testimonials />
                    <Contact />
                  </>
                }
              />

              {/* GetInspired */}
              <Route path="/getinspired" element={<GetInspired />} />

              {/* USER PAGES */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />

              {/* STATIC PAGES */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/shop" element={<Features />} />
              <Route path="/contact" element={<Contact />} />

              {/* CATEGORY PAGES */}
              <Route path="/men" element={<MenCategories />} />
              <Route path="/women" element={<WomenCategories />} />
              <Route path="/kids" element={<KidsCategories />} />
              
              {/* PRODUCT PAGES */}
              <Route path="/men/:subcategory" element={<MenProducts />} />
            </Routes>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}