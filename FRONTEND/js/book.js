import productApi from "../api/product.api.js";
import navbar from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();

const mapper = (data) => {
  data.map(({ _id, title, price, img }) => {
    let div = document.createElement("div");
    div.setAttribute("id", _id)
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
    cartButton.classList.add("add-to-cart");
    cartButton.addEventListener("click", () => {
      alert(`${title} has been added to your cart!`);
    });
    div.append(a);
    a.append(imgT, titleT, priceT, cartButton);
    document.getElementById("booklist").append(div);
  });
};

const getProducts = async () => {
  let data = await productApi.get();
  console.log(data);
  
  mapper(data);
};
getProducts();