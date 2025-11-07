import api from "./api";
import Cookies from "js-cookie";

export const register = async (form) => {
  try {
    const res = await api.post("/auth/register", form, { withCredentials: true });
    alert(res.data.message);
    Cookies.set("token", res.data.token, { expires: 7 });
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
    throw err;
  }
};

export const login = async (form) => {
  try {
    const res = await api.post("/auth/login", form, { withCredentials: true });
    Cookies.set("token", res.data.token, { expires: 7 });
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
    throw err;
  }
};


export const fetchProducts = async() => {
  try {
    const res = await api.get("/products");
    return res.data;
  } catch (err) {
    console.error("Failed to load products", err);
    throw err;
  }
}

export const addToCart = async (productId, qty = 1) => {
  try {
    const token = Cookies.get("token");
    const res = await api.post("/cart/",
      { productId, qty },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Add to Cart failed:", err);
    throw err.response?.data || { message: "Failed to add to cart" };
  }
};

export const loadCart = async() => {
  try {
    const res = await api.get("/cart/", { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Failed to load cart", err);
    throw err;
  } 
}

export const updateCartQuantity = async(cart, productId, change) => {
  try {
    const item = cart.items.find((i) => i.productId === productId);
    const newQty = item.qty + change;
    if (newQty <= 0) return removeItem(productId);
    await api.post("/cart/",
      { productId, qty: change },
      { withCredentials: true }
    );
    const res = await api.get("/cart", { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Failed to update quantity", err);
    throw err;
  }
}

export const removeCartItem = async(id) => {
  try {
    await api.delete(`/cart/${id}`, { withCredentials: true });
    const res = await api.get("/cart", { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Failed to remove item", err);
    throw err;
  }
}

export const cartCheckout = async(cartItems) => {
  try {
    const res = await api.post("/checkout/", { cartItems: cartItems });
    return res.data;
  } catch (err) {
    console.log(`Checkout failed. ${err}`);
    throw err;
  }
}