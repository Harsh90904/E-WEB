const monogoose = require("mongoose");

const productschema = new monogoose.Schema({
        user:{type:monogoose.Schema.ObjectId, ref:"User",require:true},
        product:[{type:monogoose.Schema.ObjectId, ref:"Product"}], 
        text:{type:String, require:true},
        createdAt: { type: Date, default: Date.now },
});

const Commnet = monogoose.model("Commnet", productschema);
module.exports = Commnet;