const {Router} = require('express');
const { getByProductId, addToCart, removeFromCart, addQuantity, removeQuantity } = require('../controllers/cart.controller'); 
const cartrouter = Router();


cartrouter.get('/:userid', getByProductId );
cartrouter.post('/add', addToCart); 
cartrouter.post('/remove', removeFromCart );
cartrouter.post('/add-quantity', addQuantity); 
cartrouter.post('/remove-quantity', removeQuantity); 
module.exports = cartrouter;
