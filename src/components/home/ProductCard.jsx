import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../config/services";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [qty] = useState(1);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      setLoading(true);
      await addToCart(product.id, qty);
      alert("✅ Product added to cart successfully!");
    } catch (err) {
      alert(err.message || "Failed to add product to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={product.id}
      onClick={() => navigate(`/product/${product.id}`, { state: product })}
      className="cursor-pointer bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain bg-gray-50 p-3"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h2>
        <p className="text-gray-500 text-sm mb-2 capitalize">
          {product.category}
        </p>
        <p className="text-gray-700 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold text-lg">
            ${product.price}
          </span>
          <button
            disabled={loading}
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
