const orderModel = require("../Models/orderModel");
const gadgetModel = require("../Models/gadgetModel");

const updateStock = async(orders)=>{
     await Promise.all(
        orders.map(item =>
            gadgetModel.updateOne(
                { gadgetname: item.gname },
                { $inc: { stock: -item.qty } }
            )
        )
    );
}


exports.createOrder =  async(req,res)=>{
    try
    {
        let currenttime = Date.now();
        currenttime = currenttime + 5*60*60*1000 + 30*60*1000;

        updateStock(req.body.orderlist);

        const newdoc = new orderModel({
            gadgets:req.body.orderlist,
            total:req.body.total,
            shipping:req.body.shipping,
            discount:req.body.discount,
            person: req.body.pname,
            address:req.body.address,
            uid:req.body.uid,
            orderdate:currenttime,
            status:"pending"
        });
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


exports.getordersbyuid =  async(req,res)=>{
    try{
        const orders = await orderModel.find({uid:req.query.uid});
        console.log(orders);
        if(orders.length > 0)
        {
            res.send({success:true, orders})
        }
        else
        {
            console.log("length error")
            res.send({success:false})
        }
    }
    catch(e)
    {
        console.log("error")
        res.send({success:false})
        console.log(e.message);
    }
   
}



exports.getorder =  async(req,res)=>{
    try{
        const order = await orderModel.findById(req.query.oid);
        
        if(order)
        {
            res.send({success:true, order})
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