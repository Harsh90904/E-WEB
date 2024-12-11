const Cart = require("../models/cart.modal");

const getByProductId = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.find({ user: userId }).populate("product");
        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const addToCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        let cartItem = await Cart.findOne({ user: userId, product: productId });
        if (cartItem) {
            cartItem.qty += 1;
            await cartItem.save();
            return res.send({ message: "Quantity updated", cartItem });
        }
        const newCartItem = await Cart.create({ user: userId, product: productId });
        res.send({ message: "Product added to cart", newCartItem });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const removeFromCart = async (req, res) => {
    const { cartId } = req.params;

    try {
        await Cart.findByIdAndDelete(cartId);
        res.send({ message: "Product removed from cart" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// const addQuantity = async (req, res) => {
//     const { productId, qty } = req.body;

//     try {
//         qty += 1; 
//         const cart = await Cart.findByIdAndUpdate({ _id:productId }, {qty: qty},{new: true});
//         res.send(cart);
//     } catch (error) {
//         res.send({ error: error.message });
//     }
// };
// const removeQuantity = async (req, res) => {
//     const { productId, qty } = req.body;

//     try {
//         qty -= 1; 
//         const cart = await Cart.findByIdAndUpdate({ _id:productId }, {qty: qty},{new: true});
//         res.send(cart);
//     } catch (error) {
//         res.send({ error: error.message });
//     }
// };
const updateQuantity = async (req, res) => {
    const { cartId } = req.params;
    const { qty } = req.body;

    try {
        if (qty < 1) {
            await Cart.findByIdAndDelete(cartId);
            return res.send({ message: "Product removed from cart due to zero quantity" });
        }
        const updatedCart = await Cart.findByIdAndUpdate(cartId, { qty }, { new: true });
        res.send({ message: "Quantity updated", updatedCart });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
module.exports = { getByProductId, addToCart, removeFromCart, updateQuantity};