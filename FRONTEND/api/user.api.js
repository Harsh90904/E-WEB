import { getToken } from "../utils/Cookies.js";

const baseUrl = "http://localhost:8090";
const userApi = {
  signup: async (user) => {
    try {
      let req = await fetch(`${baseUrl}/user/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let res = await req.json();
      Cookies.set("token", res.token, { expires: 3 });
      Cookies.set("isVerified", res.isVerified);
      console.log(res);
      window.location.href = "/";
    } catch (error) {
      console.log("Failed to sign up", error);
    }
  },
  login: async (user) => {
    try {
      let req = await fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let res = await req.json();
      if (res.isActive) {
        Cookies.set("token", res.token, { expires: 3 });
        Cookies.set("isVerified", res.isVerified);
        window.location.href = "/";
      } else {
        alert("not activated");
      }
    } catch (error) {
      console.log("Failed to sign up", error);
    }
  },
  getuser: async (id) => {
    try {
      let req = await fetch(`${baseUrl}/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: data,
      });
      let res = await req.json();
      console.log(res);
      return res;
    } catch (error) {}
  },
  updateAdminStatus: async (adminId )=>  {
    try {
      let req = await fetch(`${baseUrl}/user/admin-update/${adminId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(), 
      });
      let res = await req.json();
      console.log(res);
      return res;
    } catch (error) {
      console.error("Error updating admin status:", error);
      return null;
    }
  },
  deleteAdminStatus: async (adminId)=>  {
    try {
      let req =  await fetch(`${baseUrl}/user/delete/${adminId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      })
      let res = await req.json();
      console.log(res);
      return res;
    } catch (error) {
      console.error("Error deleteing admin status:", error);
      return null;
    }
  }
};

export default userApi;
