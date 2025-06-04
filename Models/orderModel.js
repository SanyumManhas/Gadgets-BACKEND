const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    gadgets:[
        {
            img:String,
            gname:String,
            price:String,
            qty:String
        }
    ],
    total:String,
    shipping:String,
    discount:String,
    person:String,
    address:String,
    uid:{type:mongoose.Types.ObjectId, ref:'user'},
    orderdate:Date,
    status:String
},{versionKey:false});

module.exports = mongoose.model("order",orderSchema);