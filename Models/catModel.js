const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({catpic:String, catname:{type:String,unique:true}},{versionKey:false});
module.exports = mongoose.model("category", catSchema,"category");