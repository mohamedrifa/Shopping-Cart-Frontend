import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addToCart } from "../config/services";

export default function ProductDetail() {
  const { state: product } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);

  const handleAddToCart = async () => {
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

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <p className="text-gray-700 mb-4 text-lg font-medium">
          Product not found 😕
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-gray-100 flex justify-center items-center py-10 px-5">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-50 p-8 border-b md:border-b-0 md:border-r border-gray-200">
          <img
            src={product.image}
            alt={product.title}
            className="w-72 h-72 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 leading-snug">
              {product.title}
            </h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description || "No description available for this product."}
            </p>
            <p className="text-blue-600 text-3xl font-semibold mb-6">
              ${product.price}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-1 bg-gray-200 rounded-lg font-bold"
              >
                -
              </button>
              <span className="font-semibold text-lg">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-1 bg-gray-200 rounded-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="flex-1 px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add to Cart"}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
