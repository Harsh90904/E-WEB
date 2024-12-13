import { getToken } from "../utils/Cookies.js";
const baseUrl = "http://localhost:8090";
const cartApi = {
  getByUserId: async () => {
    try {
      let cart = await fetch(`${baseUrl}/cart`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      let res = await cart.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  addToCart: async (product) => {
    console.log(product);

    try {
      let cart = await fetch(`${baseUrl}/cart`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(product),
      });
      let res = await cart.json();
      console.log("res", res);

      return res;
    } catch (error) {
      console.log(error);
    }
  },
  deleteCart: async (productId) => {
    try {
      let cart = await fetch(`${baseUrl}/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      let res = await cart.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  addQty: async (productId) => {
    try {
      let cart = await fetch(`${baseUrl}/cart/add-qty/${productId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      let res = await cart.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  removeQty: async (productId) => {
    try {
      let cart = await fetch(`${baseUrl}/cart/remove-qty/${productId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      let res = await cart.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  payment: async (amount) => {
    try {
      let req = await fetch(`${baseUrl}/cart/payment`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ amount: amount }),
      });
      let res = await req.json();
      const options = {
        key: "rzp_test_Pd4tazzzZH53jv",
        amount: res.amount,
      };
      const rpay = new Razorpay(options);
      rpay.open();
    } catch (error) {
      console.log(error);
    }
  }
}

export default cartApi;
