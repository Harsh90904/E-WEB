import userApi from "../api/user.api.js";
import getValue from "../components/input.js";
import {navbar} from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();

const handleSubmit = (e) => {
  e.preventDefault();
  let user = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };
  console.log(user);
  
  if (!user.email || !user.password) {
    alert("Please enter all required fields");
    return;
  }
  userApi.login(user);
};
document.getElementById("userDetails").addEventListener("submit", handleSubmit);
