import cartapi from "../api/cart.api.js";
import productApi from "../api/product.api.js";
import navbar from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();


const mapper = (data) => {
  data.map(({ user, _id, title, price, img }) => {
    
    let div = document.createElement("div");
    div.setAttribute("id", _id);
    div.classList.add("product-card");

    
    let a = document.createElement("a");
    a.href = `pages/detail.html?id=${_id}`;

    
    let titleT = document.createElement("h3");
    titleT.textContent = title;

    
    let priceT = document.createElement("p");
    priceT.textContent = "₹ " + price;

    
    let imgT = document.createElement("img");
    imgT.src = `http://localhost:8090/${img}`;
    imgT.alt = title;

    
    let cartButton = document.createElement("button");
    cartButton.textContent = "Add to Cart";
    cartButton.classList.add("add-to-cart");
    cartButton.addEventListener("click", async () => {
      try {
        let userId = user; 
        let productId = _id;

       
        let cartItems = await cartapi.getbyid(userId);
        let existingItem = cartItems.find((item) => item.product === productId);

        if (existingItem) {
          
          await cartapi.updateQuantity(existingItem._id, existingItem.qty + 1);
          alert("Quantity updated in cart!");
        } else {
          
          let product = { userId, productId };
          await cartapi.add(product);
          alert("Product added to cart!");
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    });

    
    div.append(a, cartButton);
    a.append(imgT, titleT, priceT);
    document.getElementById("booklist").append(div);
  });
};


const getProducts = async () => {
  try {
    let data = await productApi.get();
    console.log("Products:", data);
    mapper(data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


getProducts();
