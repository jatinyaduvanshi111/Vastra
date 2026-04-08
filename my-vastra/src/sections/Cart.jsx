import { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ================= FETCH CART =================
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/cart", {
          headers: {
            Authorization: token
          }
        });

        const data = await res.json();

        // 🔥 FIX: Ensure always array
        if (Array.isArray(data)) {
          setCartItems(data);
        } else if (Array.isArray(data?.cart)) {
          setCartItems(data.cart);
        } else if (Array.isArray(data?.items)) {
          setCartItems(data.items);
        } else {
          setCartItems([]);
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setCartItems([]);
        setLoading(false);
      }
    };

    if (token) fetchCart();
    else setLoading(false);
  }, [token]);

  // ================= REMOVE ITEM =================
  const removeItem = async (productId) => {
    await fetch(`http://localhost:5000/api/user/cart/${productId}`, {
      method: "DELETE",
      headers: { Authorization: token }
    });

    setCartItems(prev =>
      prev.filter(item => item?.product?._id !== productId)
    );
  };

  // ================= UPDATE QUANTITY =================
  const updateQuantity = async (productId, quantity) => {
    await fetch(`http://localhost:5000/api/user/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ quantity })
    });

    setCartItems(prev =>
      prev.map(item =>
        item?.product?._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // ================= TOTAL CALCULATION (SAFE FIX) =================
  const total = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => {
        const price = item?.product?.price || 0;
        const qty = item?.quantity || 0;
        return sum + price * qty;
      }, 0)
    : 0;

  // ================= ONLINE PAYMENT =================
  const handleOnlinePayment = async () => {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        paymentMethod: "ONLINE"
      })
    });

    const data = await res.json();

    const options = {
      key: "rzp_test_SMf5z33uvAl4fv",
      amount: (data.amount || 0) * 100,
      currency: "INR",
      name: "Vastra",
      description: "Order Payment",
      order_id: data.razorpayOrderId,

      handler: async function (response) {
        await fetch("http://localhost:5000/api/orders/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          body: JSON.stringify(response)
        });

        alert("Payment Successful 🎉");
        window.location.reload();
      },

      theme: {
        color: "#7A0C1E"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ================= COD =================
  const handleCOD = async () => {
    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        paymentMethod: "COD"
      })
    });

    alert("Order placed successfully 🎉");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-12 py-16">
      <h1 className="text-4xl font-serif text-[#7A0C1E] mb-10">My Cart</h1>

      <div className="flex gap-10">

        {/* LEFT SUMMARY */}
        <div className="w-80 bg-white rounded-xl shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between mb-2 text-gray-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {cartItems.length > 0 && (
            <>
              <button
                onClick={handleOnlinePayment}
                className="mt-6 w-full bg-[#7A0C1E] text-white py-3 rounded-full hover:opacity-90 transition"
              >
                Pay Online
              </button>

              <button
                onClick={handleCOD}
                className="mt-4 w-full bg-black text-white py-3 rounded-full hover:opacity-90 transition"
              >
                Cash on Delivery
              </button>
            </>
          )}
        </div>

        {/* RIGHT ITEMS */}
        <div className="flex-1 bg-white rounded-xl shadow p-10">
          {loading ? (
            <p>Loading...</p>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl mb-3">Your cart is empty</h2>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map(item => (
                <div
                  key={item?.product?._id}
                  className="flex gap-6 border-b pb-6"
                >
                  <img
                    src={item?.product?.image || "https://via.placeholder.com/120"}
                    alt={item?.product?.name}
                    className="rounded-lg w-28 h-28 object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {item?.product?.name}
                    </h3>

                    <p className="text-[#7A0C1E] font-semibold mt-2">
                      ₹{item?.product?.price}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item?.product?._id,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item?.product?._id,
                            item.quantity + 1
                          )
                        }
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item?.product?._id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Cart;