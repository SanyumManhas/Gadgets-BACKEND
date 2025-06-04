const express = require("express");
const router = express.Router();
const cartControllers = require("../Controllers/cartControllers");
const verifyToken = require("./authToken");

router.post("/api/addtocart", verifyToken, cartControllers.addtocart);
router.delete("/api/delfromcart", verifyToken, cartControllers.delfromcart);
router.delete("/api/delcartofuser", verifyToken, cartControllers.delcartofuser);
router.get("/api/getcart", verifyToken, cartControllers.getcart);
router.get("/api/getcartl", verifyToken, cartControllers.getcartl);

module.exports = router;