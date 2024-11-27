import superAdminApi from "../api/superAdmin/superadmin.api.js";
import navbar from "../components/navbar.js";
import { isSuperAdmin } from "../utils/Cookies.js";
document.getElementById("navbar").innerHTML = navbar();

const admin = (data) => {
  data.map(admin => {
    let div = document.createElement("div")
    let h1 = document.createElement("h1")
    h1.innerHTML = admin.username;
    let p = document.createElement("p");
    p.innerHTML = admin.email;
    let role = document.createElement("h4")
    role.innerHTML = admin.role;
    
    let active = document.createElement("button");
    active.textContent = admin.isActive ? "Active" : "Approve";

    active.addEventListener("click", async () => {
      if (!admin.isActive) {
        const response = await superAdminApi.updateAdminStatus(admin._id, true);
        
        if (response) {
            admin.isActive = true;
            button.textContent = "Active";
          
        }
      }
    });
    let reject = document.createElement("button");
    reject.textContent = "reject" 

    reject.addEventListener("click", async () => {
       await superAdminApi.deleteAdminStatus(admin._id, true);
    });
    let hr = document.createElement("hr")
    div.append(h1 , p , role ,active,reject ,   hr)
    document.getElementById("alladmin").append(div)
  })
}

if (isSuperAdmin()) {
  let data = await superAdminApi.getAdmins();
  console.log(data);
  const unactiveadimn = data.filter((admin) => admin.isVerified == false)
  admin(unactiveadimn)
  
}
else{
    console.log("No super admin");
    
}
