import React from "react";
import { updateCartQuantity, removeCartItem } from "../../config/services";

export default function CartCard({ cart, setCart, item }) {
  const updateQuantity = async (productId, change) => {
    try {
      const data = await updateCartQuantity(cart, productId, change);
      setCart(data);
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const removeItem = async (id) => {
    try {
      const data = await removeCartItem(id);
      setCart(data);
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center bg-white shadow-sm rounded-xl p-4 sm:p-5 hover:shadow-md transition">
      <img
        src={item.image}
        alt={item.title}
        className="w-28 h-28 sm:w-24 sm:h-24 object-contain rounded-lg bg-gray-50 p-2 mb-3 sm:mb-0"
      />
      <div className="flex-1 sm:ml-4 w-full">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 overflow-hidden whitespace-nowrap text-ellipsis block max-w-[250px] sm:max-w-[400px]">
          {item.title}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">${item.price}</p>

        <div className="flex items-center mt-3 space-x-3 w-full">
          <button
            onClick={() => updateQuantity(item.productId, -1)}
            className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 text-base"
          >
            −
          </button>
          <span className="text-gray-800 font-medium text-base">{item.qty}</span>
          <button
            onClick={() => updateQuantity(item.productId, 1)}
            className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 text-base"
          >
            +
          </button>
          <button
            onClick={() => removeItem(item.productId)}
            className="ml-auto text-red-500 hover:text-red-600 text-sm sm:text-base"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
