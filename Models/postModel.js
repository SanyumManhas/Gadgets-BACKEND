const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    gid:{type:mongoose.Types.ObjectId, ref:"gadget"},
    username:String,
    profilepic:String,
    review:String,
    images:[String],
    video:String,
    prating:Number,
    postdate:Date,
    likes:[{type:mongoose.Types.ObjectId, ref:'user'}],
    dislikes:[{type:mongoose.Types.ObjectId, ref:'user'}]

},{versionKey:false})


module.exports = mongoose.model("post",postSchema);