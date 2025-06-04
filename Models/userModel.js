const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({username:String, phone:Number, email:{type:String, unique:true},address:String,profilepic:String, password:String,userType:String},{versionKey:false});
module.exports = mongoose.model("user", userSchema);