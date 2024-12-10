import { getToken } from "../utils/Cookies.js";

const baseUrl = "http://localhost:8090";
const cartapi = {
  getbyid: async (id) => {
    try {
      let story = await fetch(`${baseUrl}/cart/${id}`)
      let res =  await story.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  add: async (data) => {
    console.log(data);
    try {
      let product = await fetch(`${baseUrl}/cart/add`, {
        method: "POST",
        headers:{
          "content-type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      let res = await product.json();
      console.log(res);
      // return res;
    } catch (error) {
      console.log(error);
    }
  },
  remove: async (id) => {
    try {
      let product = await fetch(`${baseUrl}/cart/remove`);
      let res = await product.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  addqty: async (id, data) => {
    try {
      let product = await fetch(`${baseUrl}/cart/add-quantity`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data),
      });
      let res = await product.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  removeqty: async (id) => {
    try {
      let product = await fetch(`${baseUrl}/cart/remove-quantity`, {
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

export default cartapi;
