import userApi from "../api/user.api.js";
// import document.querySelector from "../components/input.js";
import {navbar} from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();

const handleSubmit = (e) => {
  e.preventDefault();
  let user = {
    username: document.querySelector("#username").value,
    email: document.querySelector("#email").value,
    number: document.querySelector("#number").value,
    password: document.querySelector("#password").value,
  };
  if (!user.username || !user.email || !user.password || !user.number) {
    alert("Please enter all required fields");
    return;
  }
  userApi.signup(user);
};

document.getElementById("userDetails").addEventListener("submit", handleSubmit);
