const monogoose = require("mongoose");

const productschema = new monogoose.Schema({
        user:{type:monogoose.Schema.Types.ObjectId, ref:"User",require:true},
        product:[{type:monogoose.Schema.Types.ObjectId, ref:"Product"}], 
        text:{type:String, require:true},
        createdAt: { type: Date, default: Date.now },
});

const product = monogoose.model("Product", productschema);
module.exports = product;