import { useState } from "react";
import { FiHeart } from "react-icons/fi";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]); // future products here

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-12 py-16">
      <h1 className="text-4xl font-serif text-[#7A0C1E] mb-10">My Wishlist</h1>

      <div className="flex gap-10">

        {/* LEFT INFO PANEL */}
        <div className="w-80 bg-white rounded-xl shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Wishlist Info</h2>

          <p className="text-gray-600 text-sm mb-4">
            Items saved in your wishlist will stay here until you move them to cart or remove them.
          </p>

          <div className="flex justify-between mb-2 text-gray-600">
            <span>Total Items</span>
            <span>{wishlistItems.length}</span>
          </div>

          <button className="mt-6 w-full bg-[#7A0C1E] text-white py-3 rounded-full hover:opacity-90 transition">
            Move All to Cart
          </button>
        </div>

        {/* RIGHT WISHLIST ITEMS */}
        <div className="flex-1 bg-white rounded-xl shadow p-10">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl mb-3">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">
                Looks like you haven’t saved anything yet.
              </p>
              <button className="bg-[#7A0C1E] text-white px-8 py-3 rounded-full hover:opacity-90">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex gap-6 border-b pb-6">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-28 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-500">{item.category}</p>
                    <p className="text-[#7A0C1E] font-semibold mt-2">₹{item.price}</p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-gray-400 hover:text-red-600 flex items-center gap-1"
                    >
                      <FiHeart /> Remove
                    </button>

                    <button className="bg-[#7A0C1E] text-white px-5 py-2 rounded-full text-sm hover:opacity-90">
                      Move to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Wishlist;
