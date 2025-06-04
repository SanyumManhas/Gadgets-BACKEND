const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    uid:{type:mongoose.Types.ObjectId , ref:'user'},
    qty:Number,
    gname:String,
    img:String,
    discount:Number,
    dprice:Number
})


module.exports = mongoose.model("cart",cartSchema);