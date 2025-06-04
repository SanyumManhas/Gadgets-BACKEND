const ulikeModel = require("../Models/ulikeModel");


exports.handlelikes = async(req,res)=>{
    try{
        const userId = req.body.uid
        
        const ulike = await ulikeModel.findOne({uid:userId});

        if(!ulike)
        {
            const newulike = new ulikeModel({
                uid:userId,
                likes:[req.body.objid]
            })
            const result = await newulike.save()
            if(result)
            {
                return res.send({success:true})
            }
            else
            {
                return res.send({success:false})
            }
        }
        
        if(ulike.likes.includes(req.body.objid))
        {
            ulike.likes.pull(req.body.objid);
        }
        else
        {
            ulike.likes.push(req.body.objid);
        }

        const result = await ulike.save();
        if(result)
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
        res.send({success:false})
    }

}


exports.getulike =  async(req,res)=>{
    try{
        const ulike = await ulikeModel.findOne({uid:req.query.uid});
        if(ulike)
        {
            res.send({success:true,likes:ulike.likes})
        }
        else
        {
            console.log("ulike not found!")
            res.send({success:false})
        }
    }
    catch(e)
    {
        res.send({success:false})
        console.log(e.message);
    }
   
}