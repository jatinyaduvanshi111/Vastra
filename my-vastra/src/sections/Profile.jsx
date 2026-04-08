import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [isLogin, setIsLogin] = useState(true);

  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    houseNo: "",
    area: "",
    landmark: ""
  });

  const token = localStorage.getItem("token");

  // 🔥 Load user properly
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔥 Fetch user data
  useEffect(() => {
    if (user && token) {
      fetchOrders();
      fetchWishlist();
      fetchAddresses();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: token }
      });
      setOrders(res.data);
    } catch {}
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/wishlist", {
        headers: { Authorization: token }
      });
      setWishlist(res.data);
    } catch {}
  };

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/address", {
        headers: { Authorization: token }
      });
      setAddresses(res.data);
    } catch {}
  };

  // 🔥 LOGIN / SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            password: formData.password
          }
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        window.dispatchEvent(new Event("userChanged"));
        navigate("/");
      } else {
        await axios.post(
          "http://localhost:5000/api/auth/signup",
          formData
        );
        alert("Signup successful. Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("userChanged"));
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-10">
          <h1 className="text-3xl font-semibold text-center mb-6">
            {isLogin ? "Sign In" : "Create Account"}
          </h1>

          <div className="flex mb-6 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-full ${
                isLogin ? "bg-[#7A0C1E] text-white" : ""
              }`}
            >
              Sign In
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-full ${
                !isLogin ? "bg-[#7A0C1E] text-white" : ""
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg px-4 py-3"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-3"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-3"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <button className="w-full bg-[#7A0C1E] text-white py-3 rounded-full">
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-16 py-12">

      {/* 🔥 EMAIL REMOVED HERE */}
      <div className="bg-gradient-to-r from-[#7A0C1E] to-[#C6A75E] text-white p-8 rounded-2xl shadow-lg mb-10">
        <h1 className="text-3xl font-semibold">
          Hi, {user.name} 👋
        </h1>
      </div>

      <div className="flex gap-10">

        <div className="w-64 bg-white rounded-2xl shadow p-6 space-y-3">
          {["account","orders","wishlist","address","payment"].map(tab => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-4 py-3 rounded-lg capitalize ${
                activeTab === tab
                  ? "bg-[#7A0C1E] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {tab}
            </div>
          ))}

          <div
            onClick={handleLogout}
            className="text-red-500 cursor-pointer px-4 py-3 hover:bg-red-50 rounded-lg"
          >
            Logout
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow p-8">

          {activeTab === "account" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Account Details</h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;