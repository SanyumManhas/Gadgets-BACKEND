const postModel = require("../Models/postModel");
const cloudinary = require("../Routes/cloudinary")

exports.setlike =  async(req,res)=>{
    try{
    
    const id = req.body.id
    const userId = req.body.uid
    
    const post = await postModel.findById(id);

    if(!post)return res.status(404).json({ message: 'Post not found' });

    if(post.likes.includes(userId)) {
    post.likes.pull(userId); // unlike
  } else {
    post.likes.push(userId);
    post.dislikes.pull(userId); // remove dislike if any
  }
    
    const result = await post.save();
    
    if(result)
    {
        res.send({success:true})
    }
    else{
        res.send({success:false});
    }}
    catch(e)
    {
        console.log(e);
    }
}

exports.setdislike =  async(req,res)=>{
    try{
    
    const id = req.body.id
    const userId = req.body.uid
    
    const post = await postModel.findById(id);

    if(!post)return res.status(404).json({ message: 'Post not found' });

    if(post.dislikes.includes(userId)) {
    post.dislikes.pull(userId); // unlike
  } else {
    post.dislikes.push(userId);
    post.likes.pull(userId); // remove dislike if any
  }
    
    const result = await post.save();
    
    if(result)
    {
        res.send({success:true})
    }
    else{
        res.send({success:false});
    }}
    catch(e)
    {
        console.log(e);
    }
}



exports.postreview =  async(req,res)=>{
    try
    {
        const uploadToCloudinary = async (fileBuffer, filename, resourceType = "image") => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: resourceType,
                    folder: "posts",
                    public_id: filename,
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                }
                );
                stream.end(fileBuffer);
            });
        };

        const imageFiles = req.files['images'] || [];
        const videoFile = req.files['video'] ? req.files['video'][0] : null;

        // Upload images
        const uploadedImageUrls = await Promise.all(
        imageFiles.map((file, i) =>
            uploadToCloudinary(file.buffer, `post_image_${Date.now()}_${i}`, "image")
        )
        );

        // Upload video if exists
        let uploadedVideoUrl = "novideo";
        if (videoFile) {
        uploadedVideoUrl = await uploadToCloudinary(videoFile.buffer, `post_video_${Date.now()}`, "video");
        }

        // Construct postmedia object
        const postmedia = {
        images: uploadedImageUrls,
        video: uploadedVideoUrl
        };



        // const postmedia = {
        //     images: req.files['images'] ? req.files['images'].map(file => file.filename) : [],
        //     video: req.files['video'] ? req.files['video'][0].filename : "novideo"
        // };

        //conerting back to json objects (Arrays of json objects)

        const newdoc = new postModel({
            gid:req.body.gid,
            username:req.body.username,
            profilepic:req.body.profilepic,
            review:req.body.review,
            images:postmedia.images,
            video:postmedia.video,
            prating:req.body.prating,
            likes:[],
            dislikes:[],
            postdate:new Date()
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


exports.getpreviews = async(req,res)=>{
    try{
        const gid = req.query.gid;
        const result = await postModel.find({gid:gid});
        if(result.length > 0)
        {
            res.send({success:true, posts:result});
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

exports.getprbyid =  async(req,res)=>{
    try{
        const result = await postModel.findById(req.query.id);
        if(result)
        {
            res.send({success:true, post:result});
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

exports.searchreviewq = async(req,res)=>{
    try{
        const query = req.params.q;
        const result = await postModel.find({$or:[{person:{$regex: '.*'+query, $options:'i'}}, {review:{$regex: '.*'+query, $options:'i'}}]})
        if(result.length > 0)
        {
            res.send({success:true, rvlist:result});
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