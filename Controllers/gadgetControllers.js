const gadgetModel = require("../Models/gadgetModel");
const cloudinary = require("../Routes/cloudinary")

exports.addgadget = async(req,res)=>{
    try
    {
        const uploadToCloudinary = async (fileBuffer, filename) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                { resource_type: "image", folder: "gadgets", public_id: filename },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                }
                );
                stream.end(fileBuffer);
        });
        };

        //cat-icon.jpg

        const gadgetpictures = {
            gadgetdisplaypic: req.files['gadgetdisplaypic']
                ? await uploadToCloudinary(req.files['gadgetdisplaypic'][0].buffer, "gadgetdisplaypic")
                : "cat-icon.jpg",
            
            gadgetdisplaypics: req.files['gadgetdisplaypics']
                ? await Promise.all(req.files['gadgetdisplaypics'].map((file, idx) =>
                    uploadToCloudinary(file.buffer, `gadgetdisplaypics_${Date.now()}_${idx}`)
                ))
                : [],

            hotonepic: req.files['hotonepic']
                ? await uploadToCloudinary(req.files['hotonepic'][0].buffer, "hotonepic")
                : "cat-icon.jpg"
        };

        //conerting back to json objects (Arrays of json objects)
       
        const specs = JSON.parse(req.body.specs);
        const descs = JSON.parse(req.body.descriptions);
        const newdoc = new gadgetModel({
            cid:req.body.cid,

            scid:req.body.scid,
            discount:req.body.discount,
            stock:req.body.stock,
            specifications:specs,
            descriptions:descs,
            gadgetdisplaypic:gadgetpictures.gadgetdisplaypic, 

            gadgetname:req.body.gadgetname,

            gadgetdisplaypics:gadgetpictures.gadgetdisplaypics,

            hotone:req.body.hotone,

            hotonepic:gadgetpictures.hotonepic,

            price:req.body.price,

            featured:req.body.featured,

            launchdate:req.body.launchdate,


            companyname:req.body.companyname,

            userrating:0,

            verdict:'ok',
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


exports.delgadget = async(req,res)=>{
    const result = await gadgetModel.findByIdAndDelete(req.query.id);
    if(result)
    {
        res.send({success:true})
    }
    else
    {
        res.send({success:false})
    }
}

exports.getgadgetsbyid = async(req,res)=>{
    try{
        const scid = req.query.scid;
        const result = await gadgetModel.find({scid:scid});
        if(result.length > 0)
        {
            res.send({success:true, gadgets:result});
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


exports.gfilter = async(req,res)=>{
    try{
        const id = req.query.id;
        const comp = req.query.comp;
        const pricerange = req.query.price !== null? JSON.parse(req.query.price): null;
        const localfilter = req.query.localfilter;
        let queryObject = {};
        if(id !== "null")
        {
            queryObject = {...queryObject,   $or: [{cid:id},{scid:id}]}
        }
        if(comp !== "null")
        {
            queryObject = {...queryObject,  companyname:comp}
        }
        if(pricerange !== null)
        {
            console.log(pricerange + "inside null if")
            queryObject = {...queryObject,  price:{$gte:pricerange.min,$lte:pricerange.max}}
        }
        let result;
      
        if(localfilter === "Oldest")
        {
            result = await gadgetModel.find(queryObject).sort({launchdate: 1});
        }
        else if(localfilter === "trending")
        {
            result = await gadgetModel.find(queryObject).sort({price: -1});
        }
        else if(localfilter === "Relevance")
        {
            result = await gadgetModel.find(queryObject).sort({price: 1});
        }
        else if(localfilter === "Latest")
        {
            result = await gadgetModel.find(queryObject).sort({launchdate: -1});
        }
        else
        {
            result = await gadgetModel.find((queryObject));
        }
        if(result.length > 0)
        {
            res.send({success:true, gadgets:result});
        }
        else
        {
            res.send({success:false});
        }
    }
    catch(e)
    {
        console.log(e)
    }
}



exports.getgadgets = async(req,res)=>{
    try{
        const result = await gadgetModel.find({featured:true}).sort({"launchdate":-1});
        if(result.length > 0)
        {
            res.send({success:true, gdlist:result});
        }
        else
        {
            res.send({success:false});
        }
    }
    catch(e)
    {
        res.status(500).send({success:false})
        console.log(e.message)
    }
}

exports.getsimil = async(req,res)=>{
    try{
        const result = await gadgetModel.find({$or:[{cid:req.query.cid},{scid:req.query.scid}]});
        if(result.length > 0)
        {
            res.send({success:true, simi:result});
        }
        else
        {
            res.send({success:false});
        }
    }
    catch(e)
    {
        res.status(500).send({success:false})
        console.log(e.message)
    }
}




exports.getgadgetsbyscid = async(req,res)=>{
    try{
        const result = await gadgetModel.find({scid:req.query.scid})
        if(result.length > 0)
        {
            res.send({success:true, gadgets:result});
        }
        else
        {
            res.send({success:false});
        }
    }
    catch(e)
    {
        res.status(500).send({success:false})
        console.log(e.message)
    }
}


exports.updategadget = async(req,res)=>{
    try
    {

         const uploadToCloudinary = async (fileBuffer, filename) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                { resource_type: "image", folder: "gadgets", public_id: filename },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                }
                );
                stream.end(fileBuffer);
        });
        };

        // const newgadgetpictures = {
        //     newgadgetdisplaypic: req.files['newgadgetdisplaypic'] ? req.files['newgadgetdisplaypic'][0].filename : "",
        //     newgadgetdisplaypics: req.files['newgadgetdisplaypics'] ? req.files['newgadgetdisplaypics'].map(file => file.filename) : [],
        //     newhotonepic: req.files['newhotonepic'] ? req.files['newhotonepic'][0].filename : ""
        // };

        const newgadgetpictures = {
            newgadgetdisplaypic: req.files['newgadgetdisplaypic']
                ? await uploadToCloudinary(req.files['newgadgetdisplaypic'][0].buffer, "newgadgetdisplaypic")
                : "",
            
            newgadgetdisplaypics: req.files['newgadgetdisplaypics']
                ? await Promise.all(req.files['newgadgetdisplaypics'].map((file, idx) =>
                    uploadToCloudinary(file.buffer, `newgadgetdisplaypics_${Date.now()}_${idx}`)
                ))
                : [],

            newhotonepic: req.files['newhotonepic']
                ? await uploadToCloudinary(req.files['newhotonepic'][0].buffer, "newhotonepic")
                : "cat"
        };
        
        const specs = JSON.parse(req.body.specs);
        const descriptions = JSON.parse(req.body.descriptions);
        

        const updateData = {
            discount:req.body.discount,
            stock:req.body.stock,
            specifications:specs,
            descriptions:descriptions, 
            gadgetname:req.body.gadgetname,
            hotone:req.body.hotone,
            price:req.body.price,
            launchdate:req.body.launchdate,
            companyname:req.body.companyname,
            featured:req.body.featured,
        }

        if(newgadgetpictures.newgadgetdisplaypic !== "")
        {
            updateData.gadgetdisplaypic = newgadgetpictures.newgadgetdisplaypic
        }

        if(newgadgetpictures.newgadgetdisplaypics.length > 0 )
        {
            updateData.gadgetdisplaypics = newgadgetpictures.newgadgetdisplaypics
        }
        
        if(newgadgetpictures.newhotonepic !== "")
        {
            updateData.newhotonepic = newgadgetpictures.newhotonepic
        }

        

        const updategadget = await gadgetModel.updateOne({_id:req.body.gid},updateData);

        if(updategadget.modifiedCount === 1)
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



exports.searchbyname =  async(req,res)=>{
    try{
        const query = req.params.q;
        const result = await gadgetModel.find({$or:[{gadgetname:{$regex: '.*'+query, $options:'i'}}, {companyname:{$regex: '.*'+query, $options:'i'}}]})
        if(result.length > 0)
        {
            res.send({success:true, fetchedgadgets:result});
        }
        else
        {
            res.send({success:false});
        }
    }
    catch(e)
    {
        res.status(500).send({success:false})
        console.log(e.message)
    }
}

exports.getgadgetsbygid = async(req,res)=>{
    try{
        const gid = req.query.gid;
        const result = await gadgetModel.findOne({_id:gid})
        if(result)
        {
            res.send({success:true, gd:result});
        }
        else
        {
            res.send({success:false});
        }
    }
    catch(e)
    {
        res.status(500).send({success:false})
        console.log(e.message)
    }
}