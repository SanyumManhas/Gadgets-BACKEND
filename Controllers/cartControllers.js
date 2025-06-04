const cartModel = require("../Models/cartModel");


exports.addtocart =  async(req,res)=>{
    try
    {
        const newdoc = new cartModel({uid:req.body.uid,qty:req.body.qty,gname:req.body.gname,img:req.body.img,discount:req.body.discount,dprice:req.body.dprice});
        const result = await newdoc.save();
        if(result)
        {
            res.send({success:true})
        }
        else{
            res.send({success:false});
        }
    }
    catch(e)
    {
        console.log(e);
    }
}

exports.delfromcart = async(req,res)=>{
    try{
        const citemid = req.query.citem;
        const deleted = await cartModel.findByIdAndDelete(citemid);
        if(deleted)
        {
            res.send({success:true})
        }
        else
        {
            res.send({success:false})
        }
    }
    catch(e)
    {
        console.log(e.message)
    }
}

exports.delcartofuser =  async(req,res)=>{
    try{
        const uid = req.query.uid;
        const deleted = await cartModel.deleteMany({uid:uid});
        if(deleted.deletedCount > 0)
        {
            res.send({success:true})
        }
        else
        {
            res.send({success:false})
        }
    }
    catch(e)
    {
        console.log(e.message)
    }
}

exports.getcart =  async(req,res)=>{
    try{
        const cartitems = await cartModel.find({uid:req.query.uid});
        if(cartitems.length > 0)
        {
            res.send({success:true, cartitems})
        }
        else
        {
            res.send({success:false})
        }
    }
    catch(e)
    {
        res.send({success:false})
        console.log(e.message);
    }
   
}
exports.getcartl =  async(req,res)=>{
    try{
        const cartitems = await cartModel.find({uid:req.query.uid});
        if(cartitems.length > 0)
        {
            res.send({success:true, length:cartitems.length})
        }
        else
        {
            res.send({success:false})
        }
    }
    catch(e)
    {
        res.send({success:false})
        console.log(e.message);
    }
   
}
