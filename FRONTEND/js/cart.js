import cartApi from "../api/cart.api.js";
import navbar from "../components/navbar.js";

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
    cartApi.payment(amount);
  } catch (error) {
    console.log(error);
  }
}
let totalPrice = 0;
const mapper = (data) => {
  data.map(({ _id, qty, product }) => {
    const { title, price, img } = product;
    console.log(title,price,img);
    
    totalPrice += price * qty;
    let div = document.createElement("div");
    let titleT = document.createElement("h3");
    titleT.innerHTML = title;
    let priceT = document.createElement("p");
    priceT.innerHTML ="₹" +  price;
    let imgT = document.createElement("img");
    imgT.src = `http://localhost:8090/${img}`;
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

  let amount = document.createElement("p");
  amount.innerHTML = totalPrice;
  let btn = document.createElement("button");
  btn.innerHTML = "Pay";
  btn.addEventListener("click", () => payment(totalPrice));
  let div = document.createElement("div");

  div.append(amount, btn);
  document.getElementById("cartlist").append(div);
  console.log("total", totalPrice);
};

const getCartData = async () => {
  let data = await cartApi.getByUserId();
  mapper(data);
  console.log("data", data);
};

getCartData();
