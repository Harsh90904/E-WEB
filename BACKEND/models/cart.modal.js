const  monogoose = require('mongoose');

const cartSchema = new monogoose.Schema({
    user:{type:monogoose.Schema.ObjectId, ref:"User",require:true},
    product:[{type:monogoose.Schema.ObjectId, ref:"Product"}],
    qty:{type:Number , default:1}
})
const Cart = monogoose.model('Cart',cartSchema);

module.exports = Cart;