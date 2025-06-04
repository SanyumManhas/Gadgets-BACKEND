const express = require("express");
const router = express.Router();
const transporter = require("./mailConfig");
const verifyToken = require("./authToken");
const userModel = require("../Models/userModel")

const jwt = require('jsonwebtoken');
const SECRET_KEY = '123456789Sanyum1';

router.post("/api/profreg", verifyToken, async(req,res)=>{
    try{
        const mailOptions = {
            from:'class@gtbinstitute.com',
            to:'msanyum@gmail.com',
            subject:'Request to be registered professional',
            html:`<p>Request from ${req.body.name},</p><br/><p>Certifications: ${req.body.certifications}</p><br/><p>Experience${req.body.exp}</p>
            <br/><p>Social Links: ${req.body.sociallinks}</p><br/>`
        };

        transporter.sendMail(mailOptions, (error,info)=>{
            if(error){
                console.log(error);
                res.send({success:false})
            }
            else
            {
                console.log("Email Sent");
                res.send({success:true})
            }
        })
    }
    catch(e)
    {
        console.log(e.message);
        res.send({success:false})
    }
})


router.post("/api/contactus", verifyToken, async(req,res)=>{
     try{
        const mailOptions = {
            from:'class@gtbinstitute.com',
            to:'msanyum@gmail.com',
            subject:req.body.subject,
            html:`<p>${req.body.message}</p>`
        };

        transporter.sendMail(mailOptions, (error,info)=>{
            if(error){
                console.log(error);
                res.send({success:false})
            }
            else
            {
                console.log("Email Sent");
                res.send({success:true})
            }
        })
    }
    catch(e)
    {
        console.log(e.message);
        res.send({success:false})
    }
})


router.get("/api/resetlink", async(req,res)=>{
    try{
        const em = req.query.em;
        const user = await userModel.findOne({email:em});
        const token = jwt.sign({ email: em }, SECRET_KEY, { expiresIn: '15m' });
        const encodedToken = encodeURIComponent(token);

        if(user)
        {
            const mailOptions = {
                from:'class@gtbinstitute.com',
                to:em,
                subject:'Password reset Link',
                html:`<p>Press The Link below to reset password</p>
                <a href="http://localhost:3000/resetpass/${encodedToken}">RESET</a>
                `
            };

            transporter.sendMail(mailOptions, (error,info)=>{
                if(error){
                    console.log(error);
                    res.send({success:false})
                }
                else
                {
                    console.log("Email Sent");
                    res.send({success:true})
                }
            })
        }
        else
        {
            res.send({success:false})
        }
    }
    catch(e)
    {
        console.log(e.message);
    }
})
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/api/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // validate token
    console.log(decoded);
    const email = decoded.email;

    const user = await userModel.findOne({ email : email });


    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const hash = bcrypt.hashSync(newPassword, saltRounds);
    user.password = hash;

    await user.save();

    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
});

module.exports = router

