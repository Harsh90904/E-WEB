const monogoose = require("mongoose");

const productschema = new monogoose.Schema({
        user:{type:monogoose.Schema.Types.ObjectId, ref:"User",require:true},
        product:[{type:monogoose.Schema.Types.ObjectId, ref:"Product"}], 
        rating: { type: Number, min: 1, max: 5, required: true },
        createdAt: { type: Date, default: Date.now },
});

const Rating = monogoose.model("Rating", productschema);
module.exports = Rating;