const { Router } = require("express");
const {
  getByUserId,
  addToCart,
  removeCart,
  addQty,
  removeQty,
  checkout,
} = require("../controllers/cart.controller");
const { decode } = require("../middlewares/decodeJwt");

const cartRoute = Router();
cartRoute.get("/", decode, getByUserId);
cartRoute.post("/", decode, addToCart);
cartRoute.delete("/:cartId", decode, removeCart);
cartRoute.patch("/add-qty/:cartId", decode, addQty);
cartRoute.patch("/remove-qty/:cartId", decode, removeQty);
cartRoute.post("/payment", checkout);
module.exports = cartRoute;
