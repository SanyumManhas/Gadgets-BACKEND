const express = require("express");
const router = express.Router();
const orderControllers = require("../Controllers/orderControllers");


const verifyToken = require("./authToken");

router.post("/api/createOrder", verifyToken, orderControllers.createOrder);
router.get("/api/getordersbyuid",verifyToken,  orderControllers.getordersbyuid);
router.get("/api/getorder",verifyToken, orderControllers.getorder);

module.exports = router;