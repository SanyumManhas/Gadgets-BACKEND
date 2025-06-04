const subcatModel = require("../Models/subcatModel");


exports.addsubcats =async(req,res)=>{
    try
    {
        
        const newdoc = new subcatModel({cid:req.body.cid,subcatname:req.body.subcatname});
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

exports.getsubcats =  async(req,res)=>{
    try{
        const cid = req.query.cid;
        const result = await subcatModel.find({cid:cid});
        if(result.length > 0)
        {
            res.send({success:true, subcats:result});
        }
        else
        {
            res.send({success:false});
        }
    }
    catch(e)
    {
        console.log(e.message)
    }
}


exports.updatesubCat = async(req,res)=>{
    const result = await subcatModel.findByIdAndUpdate(req.body.scid,{
        cid:req.body.cid,subcatname:req.body.subcatname
    });
    if(result)
    {
        res.send({success:true})
    }
    else
    {
        res.send({success:false})
    }
}

exports.delsubcat = async(req,res)=>{
    const result = await subcatModel.findByIdAndDelete(req.query.id);
    if(result)
    {
        res.send({success:true})
    }
    else
    {
        res.send({success:false})
    }
}