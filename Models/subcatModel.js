const mongoose = require("mongoose");

const subcatSchema = new mongoose.Schema({cid:{type:mongoose.Types.ObjectId , ref:'category'},subcatpic:String, subcatname:{type:String,unique:true}},{versionKey:false});
module.exports = mongoose.model("subcategory", subcatSchema,"subcategory");