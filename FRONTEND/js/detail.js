import commentApi from "../api/commnet.api.js";
import productApi from "../api/product.api.js";
import {navbar} from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();
const queryParams = new URLSearchParams(window.location.search)
console.log(queryParams.get("id"));


const mapper = (data) => {
  data.map(({ _id, title, price, img,description }) => {
    console.log(_id);
    const  productId = `_id`
    let div = document.createElement("div");
    div.classList.add("details");
    let imagdiv = document.createElement("div");
    imagdiv.classList.add("image");
    let connetdiv = document.createElement("div");
    connetdiv.classList.add("content");
    let titleT = document.createElement("h3");
    titleT.innerHTML = title;

    let priceT = document.createElement("p");
    priceT.innerHTML = "₹ " + price;
    let descriptionT = document.createElement("p");
    descriptionT.innerHTML =  description;
    let imgT = document.createElement("img");
    imgT.src = `http://localhost:8090/${img}`;

    let cartButton = document.createElement("button");
    cartButton.textContent = "Bay";
    cartButton.classList.add("add-to-cart");
    cartButton.addEventListener("click", () => {
      alert(`${title} has been added to your cart!`);
    });
    connetdiv.append(titleT,  descriptionT ,priceT,  cartButton);
    imagdiv.append(imgT);
    div.append(imagdiv, connetdiv);
    document.getElementById("bookdetels").append(div);
  });
};

const getProducts = async () => {
  let data = await productApi.getById(queryParams.get("id"));
  console.log(data);
  data = [data];
  mapper(data);
};
getProducts();



const renderComments = (comments) => {
  const commentsDisplay = document.getElementById("comments-display");

  comments.forEach(({ username, text }) => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.innerHTML = `
      <span class="username">${username}</span>
      <p class="comment-text">${text}</p>
    `;
    commentsDisplay.appendChild(commentDiv);
  });
};

// Post a new comment
const postComment = async () => {
  const commentBox = document.getElementById("comment-box");
  const commentText = commentBox.value.trim();

  if (!commentText) {
    alert("Please enter a comment!");
    return;
  }

  const data = JSON.stringify({
    username: "Anonymous", 
    text: commentText,
    productApi,
  });

  const response = await commentApi.post(data);
  if (response) {
    alert("Comment posted successfully!");
    commentBox.value = "";
    fetchComments();
  }
};

// Fetch and display comments
const fetchComments = async () => {
  const comments = await commentApi.getById(productApi);
  renderComments(comments);
};

document.getElementById("post-comment").addEventListener("click", postComment);
fetchComments();