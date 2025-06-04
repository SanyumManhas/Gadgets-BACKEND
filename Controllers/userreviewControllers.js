const ureviewModel = require("../Models/ureviewModel");
const cloudinary = require("../Routes/cloudinary")

exports.postureview =  async(req,res)=>{
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

        const postmedia = {
            images: req.files['images'] ? await Promise.all(req.files['images'].map((file, idx) =>
                    uploadToCloudinary(file.buffer, `uimages_${Date.now()}_${idx}`)
                )): []
        };

        //converting back to json objects (Arrays of json objects)

        const newdoc = new ureviewModel({
            gid:req.body.gid,
            username:req.body.username,
            profilepic:req.body.profilepic,
            review:req.body.review,
            images:postmedia.images,
            urating:req.body.urating,
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

exports.getureviews =  async(req,res)=>{
    try{
        const gid = req.query.gid;
        const result = await ureviewModel.find({gid:gid});
        if(result.length > 0)
        {
            res.send({success:true, ureviews:result});
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