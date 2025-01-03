import { getToken } from "../utils/Cookies.js";

const baseUrl = "http://localhost:8090";
const commentApi = {
  post: async (data) => {
    try {
      let product = await fetch(`${baseUrl}/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: data,
      });
      let res = await product.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  getById: async (id) => {
    try {
      let product = await fetch(`${baseUrl}/comment/${id}`);
      let res = await product.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  patch: async (id, data) => {
    try {
      let product = await fetch(`${baseUrl}/comment/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      let res = await product.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (id) => {
    try {
      let product = await fetch(`${baseUrl}/comment/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      let res = await product.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

export default commentApi;
