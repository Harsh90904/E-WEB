const Cart = require("../models/cart.modal");

const getByProductId = async (req, res) => {
    const { userId,productId } = req.params;

    try {
        const cart = await Cart.findOne( userId ).populate( productId);
        res.send(cart);
    } catch (error) {
        res.send({ error: error.message });
    }
};

const addToCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        let cart = await Cart.findOne({ user: userId });
        let isExtistent =await Cart.findOne({user: userId, product: productId})
        if(isExtistent) {
            cart.qty += 1
            cart.save();
            res.send(isExtistent)
        } else {
            res.send(cart);
        }
    } catch (error) {
        res.send({ error: error.message });
    }
    
};

const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findByIdAndDelete();
        res.send(cart);
    } catch (error) {
        res.send({ error: error.message });
    }
};

const addQuantity = async (req, res) => {
    const { cartId, qty } = req.body;

    try {
        const cart = await Cart.findByIdAndUpdate();
        res.send(cart);
    } catch (error) {
        res.send({ error: error.message });
    }
};

module.exports = { getByProductId, addToCart, removeFromCart, addQuantity };
