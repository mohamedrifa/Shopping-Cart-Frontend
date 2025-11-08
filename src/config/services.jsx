import api from "./api";
import Cookies from "js-cookie";

export const register = async (form) => {
  try {
    const res = await api.post("/auth/register", form, { withCredentials: true });
    const { token, user, message } = res.data;
    if (token) Cookies.set("token", token, { expires: 7 });
    localStorage.setItem("user", JSON.stringify(user));
    alert(message);
    return res.data;
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
    throw err;
  }
};

export const login = async (form) => {
  try {
    const res = await api.post("/auth/login", form, { withCredentials: true });
    const { token, user } = res.data;
    if (token) Cookies.set("token", token, { expires: 7 });
    localStorage.setItem("user", JSON.stringify(user));
    return res.data;
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
    throw err;
  }
};

export const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    return res.data;
  } catch (err) {
    console.error("Failed to load products", err);
    throw err;
  }
};

const authHeader = () => {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const addToCart = async (productId, qty = 1) => {
  try {
    const res = await api.post(
      "/cart/",
      { productId, qty },
      { headers: authHeader(), withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Add to Cart failed:", err);
    throw err.response?.data || { message: "Failed to add to cart" };
  }
};

export const loadCart = async () => {
  try {
    const res = await api.get("/cart/", {
      headers: authHeader(),
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to load cart", err);
    throw err;
  }
};

export const updateCartQuantity = async (cart, productId, change) => {
  try {
    const item = cart.items.find((i) => i.productId === productId);
    const newQty = item.qty + change;
    if (newQty <= 0) return removeCartItem(productId);
    await api.post(
      "/cart/",
      { productId, qty: change },
      { headers: authHeader(), withCredentials: true }
    );
    const res = await api.get("/cart", {
      headers: authHeader(),
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to update quantity", err);
    throw err;
  }
};

export const removeCartItem = async (id) => {
  try {
    await api.delete(`/cart/${id}`, {
      headers: authHeader(),
      withCredentials: true,
    });
    const res = await api.get("/cart", {
      headers: authHeader(),
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to remove item", err);
    throw err;
  }
};

export const cartCheckout = async (cartItems) => {
  try {
    const res = await api.post(
      "/checkout/",
      { cartItems },
      { headers: authHeader(), withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.log("Checkout failed:", err);
    throw err;
  }
};
