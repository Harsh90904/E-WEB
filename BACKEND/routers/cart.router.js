const {Router} = require('express');
const { getByProductId, addToCart, removeFromCart, updateQuantity } = require('../controllers/cart.controller'); 
const cartrouter = Router();


cartrouter.get("/:userId", getByProductId); 
cartrouter.post("/add", addToCart); 
cartrouter.delete("/:cartId", removeFromCart); 
// cartrouter.patch('/add-qty/:productid', addQuantity); 
// cartrouter.post('/remove-quantity', removeQuantity); 
cartrouter.patch("/update-quantity/:cartId", updateQuantity);
module.exports = cartrouter;