const express = require('express');
const app = express();
const port = 9000;

const cors = require('cors');


// app.use(cors({
//   origin: 'http://localhost:3000', // your frontend origin
//   credentials: true,               // REQUIRED for cookies
// }));

app.use(cors());

app.use(express.json());


const userRoutes = require("./Routes/userRoutes");
const catRoutes = require("./Routes/catRoutes");
const subcatRoutes = require("./Routes/subcatRoutes");
const gadgetRoutes = require("./Routes/gadgetRoutes");
const postRoutes = require("./Routes/postRoutes");
const ureviewRoutes = require("./Routes/userreviewRoutes");
const replyRoutes = require("./Routes/replyRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const likesRoutes = require("./Routes/likesRoutes");
const mailRoutes = require("./Routes/mailRoutes");

const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.use(userRoutes);
app.use(catRoutes);
app.use(subcatRoutes);
app.use(gadgetRoutes);
app.use(postRoutes);
app.use(ureviewRoutes);
app.use(replyRoutes);
app.use(orderRoutes);
app.use(cartRoutes);
app.use(likesRoutes);
app.use(mailRoutes);

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://msanyum:vXmUIqUlKnTQZJbJ@gadgetsplus.fdddhaz.mongodb.net/Gadgets+?retryWrites=true&w=majority&appName=GadgetsPlus").then(()=>{
    console.log("Connected to Mongodb")
}).catch((e)=>{
    console.log("Error while connecting to db" + e.message);
})


app.listen(port, ()=>{
    console.log("Server Started!")
})