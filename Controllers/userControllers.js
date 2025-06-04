const bcrypt = require('bcrypt');
const saltRounds = 10;
const userModel = require('../Models/userModel');

const SECRET_KEY = '123456789Sanyum1';
const crypto = require('crypto');
const hexToBuffer = (hex) => Buffer.from(hex, 'hex');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Add to server.js



const decryptPassword = (encryptedHex, ivHex) => {
    const key = Buffer.from(SECRET_KEY, 'utf8');
    const iv = hexToBuffer(ivHex);
    const encryptedData = hexToBuffer(encryptedHex);
  
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString('utf8');
};

exports.createUser = async(req,res)=>{
    try{
    
    const hash = bcrypt.hashSync(req.body.pass, saltRounds);
    const userdoc = new userModel({username:req.body.username, phone:req.body.phn, email:req.body.em, password:hash,userType:"normal",profilepic:"defaulticon.jpeg",address:"Address Not Added",liked:[]});
    const result = await userdoc.save();
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


exports.updateUser = async(req,res)=>{
    try{
        let type = "normal"
        if(req.body.professional)
        {
            type = "professional"
        }
        const result = await userModel.updateOne({email:req.body.email}, {
            username:req.body.username,phone:req.body.phone,address:req.body.address,email:req.body.email,
            userType:type
        })
        console.log(result);
        if(result.modifiedCount === 1)
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


exports.loginUser = async(req,res)=>{
    try{
    console.log("Login user called with body: " + req.body)    
    const decryptpass = decryptPassword(req.body.encryptedData,req.body.iv);
    const user = await userModel.findOne({email:req.body.em});


    if(user)
    {
        console.log("user found")
        const correctpass = bcrypt.compareSync(decryptpass,user.password)
        if(correctpass)
        {
             const token = jwt.sign(
                    { id: user._id, email: user.email },
                    SECRET_KEY,
                    { expiresIn: "7d" }
                );

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false, // change to true in production (HTTPS)
                    sameSite: "Lax", // or "Strict" or "None"
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                });

            res.send({success:true, userdata:user});
        }
        else
        {
            res.send({success:false})
        }
    }
    else{
        console.log("user not found")
        res.send({success:false});
    }}
    catch(e)
    {
        console.log(e);
    }
}

exports.getusers = async(req,res)=>{
    try{
        const users = await userModel.find({userType:{$ne: "admin"}});
        if(users.length > 0)
        {
            console.log("users fetched")
            res.send({success:true, dbdata:users})
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


exports.getuserbyid = async(req,res)=>{
    try{
        const user = await userModel.findById(req.query.id);
        if(user)
        {
            res.send({success:true, udata:user})
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

exports.deluser = async(req,res)=>{
    try{
        const uid = req.query.id;
        const deleted = await userModel.findByIdAndDelete(uid);
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

