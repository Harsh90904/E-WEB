import cartapi from "../api/cart.api.js";
import productApi from "../api/product.api.js";
import navbar from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();
const mapper = (data) => {
  data.map(({ user,_id, title, price, img }) => {
    let div = document.createElement("div");
    div.setAttribute("id", _id, )
    let a = document.createElement("a");
    a.href = `pages/detail.html?id=${_id}`;
    let titleT = document.createElement("h3");
    titleT.innerHTML = title;

    let priceT = document.createElement("p");
    priceT.innerHTML = "₹ " + price;

    let imgT = document.createElement("img");
    imgT.src = `http://localhost:8090/${img}`;

    let cartButton = document.createElement("button");
    cartButton.textContent = "Add to Cart";
    cartButton.setAttribute("id", "cart");
    cartButton.classList.add("add-to-cart");
    cartButton.addEventListener("click", () => {
      let userId = user;
      let productId = _id;
      let product = { userId, productId };
      console.log(product);
      
       cartapi.add(product);
      alert(`${title} has been added to your cart!`);
    });
    div.append(a, cartButton);
    a.append(imgT, titleT, priceT);
    document.getElementById("booklist").append(div);
  });
};


const getProducts = async () => {
  let data = await productApi.get();
  console.log(data);
  
  mapper(data);
};
getProducts();
