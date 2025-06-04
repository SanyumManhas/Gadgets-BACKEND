const mongoose = require("mongoose");



const ulikeSchema = new mongoose.Schema({
    uid:{type:mongoose.Types.ObjectId, ref:'user'},
    likes:[{type:mongoose.Types.ObjectId, ref:'gadget'}]
},{versionKey:false})


module.exports = mongoose.model("ulike",ulikeSchema);
