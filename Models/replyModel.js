const mongoose = require("mongoose");





const replySchema = mongoose.Schema({
    pid:{type:mongoose.Types.ObjectId, ref:'post'},
    name:String,
    pic:String,
    reply:String,
    replydate:Date
},{versionKey:false})

module.exports = new mongoose.model("reply",replySchema,"replies")