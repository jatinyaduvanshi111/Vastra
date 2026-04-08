import { useEffect, useState } from "react";

export default function MenProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        // sirf Men category ke products
        const menProducts = data.filter(
          (item) => item.category === "Men"
        );
        setProducts(menProducts);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Men Collection</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover rounded"
            />
            <h2 className="mt-3 font-semibold text-lg">
              {item.title}
            </h2>
            <p className="text-gray-600">₹{item.price}</p>

            <button className="mt-3 w-full bg-black text-white py-2">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}