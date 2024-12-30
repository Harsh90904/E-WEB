import cartApi from "../api/cart.api.js";
import { navbar } from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();

const handleQtyicon = (id, opr) => {
  if (opr == "+") {
    cartApi.addQty(id);
  } else {
    cartApi.removeQty(id);
  }
  window.location.reload();
};

const payment = async (amount) => {
  try {
    await cartApi.payment(amount);
  } catch (error) {
    console.error("Error during payment:", error);
    alert("Payment failed. Please try again.");
  }
};

let totalPrice = 0;

const mapper = (data) => {
  console.log("Cart data:", data);

  data.forEach(({ _id, qty, product }) => {
    if (Array.isArray(product)) {
      product.forEach(({ title, price, img }) => {
        totalPrice += price * qty;

        let div = document.createElement("div");
        let titleT = document.createElement("h3");
        titleT.innerHTML = title;

        let priceT = document.createElement("p");
        priceT.innerHTML = "₹" + price;

        let imgT = document.createElement("img");
        imgT.src = `http://localhost:8090/${img}`;
        imgT.alt = title;

        let btn1 = document.createElement("button");
        btn1.innerHTML = "-";
        btn1.addEventListener("click", () => handleQtyicon(_id, "-"));

        let btn2 = document.createElement("button");
        btn2.innerHTML = qty;

        let btn3 = document.createElement("button");
        btn3.innerHTML = "+";
        btn3.addEventListener("click", () => handleQtyicon(_id, "+"));

        let btnDiv = document.createElement("div");
        btnDiv.append(btn1, btn2, btn3);

        div.append(imgT, titleT, priceT, btnDiv);
        document.getElementById("cartlist").append(div);
      });
    }
  });

  let amount = document.createElement("p");
  amount.innerHTML = "Total: ₹" + totalPrice;

  let payBtn = document.createElement("button");
  payBtn.innerHTML = "Pay";
  payBtn.addEventListener("click", () => payment(totalPrice));

  let summaryDiv = document.createElement("div");
  summaryDiv.append(amount, payBtn);
  document.getElementById("cartlist").append(summaryDiv);
};

const getCartData = async () => {
  try {
    let data = await cartApi.getByUserId();
    if (!data || data.length === 0) {
      document.getElementById("cartlist").textContent = "Your cart is empty.";
      return;
    }
    mapper(data);
  } catch (error) {
    console.error("Error fetching cart data:", error);
    document.getElementById("cartlist").textContent = "Failed to load cart. Please try again later.";
  }
};

getCartData();
