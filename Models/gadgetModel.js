const mongoose = require("mongoose");

const gadgetSchema = new mongoose.Schema({
cid:{type:mongoose.Types.ObjectId , ref:'category'},
scid:{type:mongoose.Types.ObjectId , ref:'subcategory'},
gadgetdisplaypic:String, 
gadgetname:{type:String,unique:true},
gadgetdisplaypics:[String],
hotone:Boolean,
hotonepic:String,
price:Number,
stock:Number,
discount:Number,
descriptions:[String],
specifications:[
  {
    title: String,
    desc: String,
  }
],
launchdate:Date,
companyname:String,
featured:Boolean
},
{versionKey:false});

module.exports = mongoose.model("gadget", gadgetSchema,"gadget");