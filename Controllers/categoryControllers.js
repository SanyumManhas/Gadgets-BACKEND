const catModel = require("../Models/catModel");

exports.addcat = async(req,res)=>{
    try
    {
        console.log("In add category api, " + req.body.catname)   
        const newdoc = new catModel({catname:req.body.catname});
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


exports.getcats = async(req,res)=>{
    try{
        const result = await catModel.find();
        if(result.length > 0)
        {
            res.send({success:true, catsdata:result});
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



exports.updateCat = async(req,res)=>{
    
    const result = await catModel.findByIdAndUpdate(req.body.cid,{
        catname:req.body.catname
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


exports.delcat = async(req,res)=>{
    const result = await catModel.findByIdAndDelete(req.query.id);
    if(result)
    {
        res.send({success:true})
    }
    else
    {
        res.send({success:false})
    }
}


exports.getcatswithsubcats =  async(req,res)=>{
    try{
        const result = await catModel.aggregate([
        {
          $lookup: {
            from: 'subcategory', 
            localField: '_id',
            foreignField: 'cid',
            as: 'subcategories'
          }
        }
      ]);
    if(result)
    {
        res.send({success:true, catswithsubcats:result});
    }
    else
    {
        res.send({success:false})
    }}
    catch(e)
    {
        res.status(500);
        console.log("error in db side")
    }
}
