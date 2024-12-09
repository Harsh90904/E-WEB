
const monogoose = require("mongoose");

const productschema = new monogoose.Schema({
        user:{type:monogoose.Schema.Types.ObjectId, ref:"User",require:true},
        title:{type:String, require:true},
        description:{type:String, require:true},
        price:{type:Number},
        img:{type:String, require:true},
        createdAt: { type: Date, default: Date.now },
        rating:[{type:monogoose.Schema.Types.ObjectId, min:1, max:5, ref:"rating"}], 
        commnit:[{type:monogoose.Schema.Types.ObjectId, ref:"commit"}], 
});

const product = monogoose.model("Product", productschema);

module.exports = product;
