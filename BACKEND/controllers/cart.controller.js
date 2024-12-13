const Razorpay = require("razorpay");
const Cart = require("../models/cart.modal");
require("dotenv").config();
const getByUserId = async (req, res) => {
  const userId = req.user.id;
  try {
    let cart = await Cart.find({ user: userId }).populate("product");
    console.log("cart", cart);

    res.send(cart);
  } catch (error) {
    console.log("error", error);

    res.status(500).send({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  req.body.user = req.user.id;

  const { user, product } = req.body;
  try {
    let isExists = await Cart.findOne({ user: user, product: product });

    if (isExists) {
      isExists.qty += 1;
      await isExists.save();
      res.status(200).send(isExists);
    } else {
      let cart = await Cart.create(req.body);

      res.status(201).send(cart);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const removeCart = async (req, res) => {
  const { cartId } = req.params;
  try {
    let cart = await Cart.findByIdAndDelete(cartId);
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const addQty = async (req, res) => {
  let { cartId } = req.params;
  try {
    let cart = await Cart.findById(cartId);
    cart.qty += 1;
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const removeQty = async (req, res) => {
  let { cartId } = req.params;
  try {
    let cart = await Cart.findById(cartId);
    if (cart.qty >= 2) {
      cart.qty -= 1;
      await cart.save();
      res.status(200).send(cart);
    } else {
      cart = await Cart.findByIdAndDelete(cartId);
      res.status(200).send(cart);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const razorpay = new Razorpay({
  key_id: "rzp_test_Pd4tazzzZH53jv",
  key_secret: "tidBzI6GEwsKkjajgHNdB2x2",
});
const checkout = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
  };

  try {
    let data = await razorpay.orders.create(options);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ err: error });
  }
};
module.exports = {
  getByUserId,
  addQty,
  removeQty,
  removeCart,
  addToCart,
  checkout
};
