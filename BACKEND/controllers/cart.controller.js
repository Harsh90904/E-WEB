const Razorpay = require("razorpay");
const Cart = require("../models/cart.modal");
require("dotenv").config();

const getByUserId = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.find({ user: userId }).populate("product");
    console.log("cart", cart);
    res.send(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  req.body.user = req.user.id;
  const { user, product } = req.body;
  try {
    let existingCartItem = await Cart.findOne({ user, product });

    if (existingCartItem) {
      existingCartItem.qty += 1;
      await existingCartItem.save();
      res.status(200).send(existingCartItem);
    } else {
      const cartItem = await Cart.create(req.body);
      res.status(201).send(cartItem);
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).send({ error: error.message });
  }
};
const removeCart = async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await Cart.findByIdAndDelete(cartId);
    if (!cart) {
      return res.status(404).send({ error: "Cart item not found" });
    }
    res.status(200).send(cart);
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).send({ error: error.message });
  }
};

const addQty = async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).send({ error: "Cart item not found" });
    }
    cart.qty += 1;
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    console.error("Error increasing quantity:", error);
    res.status(500).send({ error: error.message });
  }
};

const removeQty = async (req, res) => {
  const { cartId } = req.params;
  try {
    let cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).send({ error: "Cart item not found" });
    }
    if (cart.qty > 1) {
      cart.qty -= 1;
      await cart.save();
      res.status(200).send(cart);
    } else {
      await Cart.findByIdAndDelete(cartId);
      res.status(200).send({ message: "Cart item removed" });
    }
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    res.status(500).send({ error: error.message });
  }
};

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_Pd4tazzzZH53jv",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "tidBzI6GEwsKkjajgHNdB2x2",
});

const checkout = async (req, res) => {
  const { amount } = req.body;
  if (!amount || isNaN(amount)) {
    return res.status(400).send({ error: "Invalid amount" });
  }

  const options = {
    amount: amount * 100,
    currency: "INR",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).send(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getByUserId,
  addQty,
  removeQty,
  removeCart,
  addToCart,
  checkout,
};
