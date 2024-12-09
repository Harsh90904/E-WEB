const { Router } = require("express");
const {
  getproduct,
  getproductById,
  createproduct,
  upadateproduct,
} = require("../controllers/product.controller");
const { decode } = require("../middlewares/decodeJwt");
const productImage = require("../utils/multer");
const productrouter = Router();

productrouter.get("/", getproduct);
productrouter.get("/:productid", getproductById);
productrouter.post("/", decode, productImage.single("img"), createproduct);
productrouter.patch("/:productid", decode, upadateproduct);
productrouter.delete("/:productid", decode, createproduct);

module.exports = productrouter;
