import cartapi from "../api/cart.api.js";
import productApi from "../api/product.api.js";
import { navbar } from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();

const mapper = (data) => {
  data.forEach(({ user, _id, title, price, img }) => {
    let div = document.createElement("div");
    div.setAttribute("id", _id);
    div.classList.add("product-card");

    let a = document.createElement("a");
    a.href = `pages/detail.html?id=${_id}`;

    let titleT = document.createElement("h3");
    titleT.textContent = title;

    let priceT = document.createElement("p");
    priceT.textContent = "\u20B9 " + price;

    let imgT = document.createElement("img");
    imgT.src = `http://localhost:8090/${img}`;
    imgT.alt = title;

    let cartButton = document.createElement("button");
    cartButton.textContent = "Add to Cart";
    cartButton.classList.add("add-to-cart");

    cartButton.addEventListener("click", async () => {
      try {
        let productId = _id;
        let cartItems = await cartapi.getByUserId(user);
        let existingItem = cartItems.find((item) => item.product._id === productId);

        if (existingItem) {
          await cartapi.updateQuantity(existingItem._id, existingItem.qty + 1);
        } else {
          // onther a product add a product array to the cart
          if(user == user) {
            cartapi.addToCart({ user, product: productId })
          }
          else {
            await cartapi.addToCart({user, product:[{ productId}]} );
          }
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
        alert("Failed to add product to cart. Please try again.");
      }
    });

    a.append(imgT, titleT, priceT);
    div.append(a, cartButton);
    document.getElementById("booklist").append(div);
  });
};

const getProducts = async () => {
  try {
    let data = await productApi.get();
    if (!data || data.length === 0) {
      console.warn("No products available.");
      document.getElementById("booklist").textContent = "No products available.";
      return;
    }
    mapper(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    document.getElementById("booklist").textContent = "Failed to load products. Please try again later.";
  }
};

getProducts();
