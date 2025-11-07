import React, { useEffect, useState } from "react";
import api from "../config/api";
import Loader from "../components/Loader";
import { cartCheckout, loadCart } from "../config/services";
import CartCard from "../components/cart/CartCard";

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await loadCart();
        setCart(data);
      } catch (err) {
        console.error("Failed to load cart", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleCheckout = async () => {
    try {
      setCheckingOut(true);
      const data = await cartCheckout(cart.items);
      alert(`✅ Order placed! Total: $${data.receipt.total.toFixed(2)}`);
      setCart({ items: [], total: 0 });
    } catch (err) {
      alert("Checkout failed. Try again.");
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-3 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        🛒 Your Cart
      </h1>

      {cart.items.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4 sm:space-y-6">
            {cart.items.map((item) => (
              <CartCard key={item.productId} cart={cart} setCart={setCart} item={item} />
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-white shadow-md rounded-xl p-5 sm:p-6 h-fit sticky md:top-24">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between text-gray-600 mb-2 text-sm sm:text-base">
              <span>Items:</span>
              <span>{cart.items.length}</span>
            </div>
            <div className="flex justify-between text-gray-800 font-semibold text-lg mb-6">
              <span>Total:</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
            <button
              disabled={checkingOut}
              onClick={handleCheckout}
              className={`w-full py-3 sm:py-3.5 rounded-lg text-white font-semibold transition text-sm sm:text-base ${
                checkingOut
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {checkingOut ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
