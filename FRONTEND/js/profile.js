import superAdminApi from "../api/superAdmin/superadmin.api.js";
import navbar from "../components/navbar.js";
import { isSuperAdmin } from "../utils/Cookies.js";
document.getElementById("navbar").innerHTML = navbar();

if (isSuperAdmin()) {
  let data = await superAdminApi.getAdmins();
  console.log(data);
  const showadmin = document.getElementById("alladmin") 
  if(data && data.length > 0){
    data.map(admin => {
      let div = document.createElement("div")
      let h1 = document.createElement("h1")
      h1.innerHTML = admin.username;
      let p = document.createElement("p");
      p.innerHTML = admin.email;
      let role = document.createElement("h4")
      role.innerHTML = admin.role;
      
      let button = document.createElement("button");
      button.textContent = admin.isActive ? "Active" : "Approve";

      button.addEventListener("click", async () => {
        if (!admin.isActive) {
          const response = await superAdminApi.updateAdminStatus(admin._id, true);
          
          if (response) {
              admin.isActive = true;
              button.textContent = "Active";
            
          }
        }
      });

      let hr = document.createElement("hr")
      div.append(h1 , p , role ,button,  hr)
      showadmin.append(div)
    })
  }
}
else{
    console.log("No super admin");
    
}
