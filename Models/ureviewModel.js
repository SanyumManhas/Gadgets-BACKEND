const mongoose = require("mongoose");


const ureviewSchema = mongoose.Schema({
    gid:{type:mongoose.Types.ObjectId, ref:"gadget"},
    username:String,
    profilepic:String,
    review:String,
    images:[String],
    urating:Number,
    postdate:{type:Date, default:Date.now() + 5*60*60*1000 + 30*60*1000},
})

module.exports = new mongoose.model("userreview",ureviewSchema);