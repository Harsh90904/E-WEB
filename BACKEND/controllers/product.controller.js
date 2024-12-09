const Product = require("../models/product.model");

const getproduct = async (req, res) => {
  try {
    let product = await Product.find();
    console.log(product);
    
    res.send(product);
  } catch (error) {
    res.send({ message: error });
  }
};
const createproduct = async (req, res) => {
  if (req.file) {
    req.body.img = req.file.path;
  }
  req.body.user = req.user.id;
  try {
    let product = await Product.create(req.body);
    res.send(product);
  } catch (error) {
    res.send({ message: error });
  }
};
const getproductById = async (req, res) => {
  try {
    let { productid } = req.params;
    let product = await Product.findById(productid);
    res.send(product);
  } catch (error) {
    res.send({ message: error });
  }
};
const upadateproduct = async (req, res) => {
  try {
    const { productid } = req.params;
    let product = await Product.findByIdAndUpdate(productid, req.body, {
      new: true,
    });
    res.send(product);
  } catch (error) {
    res.send({ message: error });
  }
};
const deleteproduct = async (req, res) => {
  try {
    const { productid } = req.params;
    let product = await Product.findByIdAndDelete(productid);
    res.send(product);
  } catch (error) {
    res.send({ error: error });
  }
};

module.exports = {
    getproduct,
    createproduct,
    getproductById,
    upadateproduct,
    deleteproduct
}