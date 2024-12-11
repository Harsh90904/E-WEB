import { getToken } from "../utils/Cookies.js";

const baseUrl = "http://localhost:8090";

const cartapi = {
  getbyid: async (id) => {
    try {
      const response = await fetch(`${baseUrl}/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching cart by ID:", error);
    }
  },

  add: async (data) => {
    try {
      const response = await fetch(`${baseUrl}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  },

  remove: async (id) => {
    try {
      const response = await fetch(`${baseUrl}/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  },

  updateQuantity: async (id, qty) => {
    try {
      const response = await fetch(`${baseUrl}/cart/update-quantity/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ qty }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  },
};

export default cartapi;
