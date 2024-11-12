import { getToken } from "../../utils/Cookies.js";

const baseUrl = "http://localhost:8090";
const superAdminApi = {
  getAdmins: async () => {
    try {
      let req = await fetch(`${baseUrl}/user/all-admin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      let res = await req.json();
      console.log(res);
      
      return res;
    } catch (error) {}
  },
  updateAdminStatus: async (adminId, isActive)=>  {
    try {
      const response = await fetch(`${baseUrl}/user/admin-update/${adminId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update admin status");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error updating admin status:", error);
      return null;
    }
  }
};
export default superAdminApi