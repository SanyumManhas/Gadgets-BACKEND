const replyModel = require("../Models/replyModel");


exports.postreply =  async(req,res)=>{
    try
    {
        
        const newdoc = new replyModel({
            pid:req.body.pid,
            name:req.body.name,
            pic:req.body.pic,
            reply:req.body.reply,
            replydate:Date.now() + 5*60*60*1000 + 30*60*1000
        });


        const result = await newdoc.save();
        if(result)
        {
            res.send({success:true})
        }
        else{
       
            res.send({success:false})
        }
    }
    catch(e)
    {
        console.log(e);
    }
}


exports.getreplies =  async(req,res)=>{
    try{
        const replies = await replyModel.find({pid:req.query.pid});
        if(replies.length > 0)
        {
            res.send({success:true, replies})
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