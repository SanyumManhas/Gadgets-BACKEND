const categoryControllers = require("../Controllers/categoryControllers");
const express = require('express');
const router = express.Router();
const verifyToken = require("./authToken");

router.post("/api/addcat", verifyToken, categoryControllers.addcat);
router.get("/api/getcats", categoryControllers.getcats);
router.get("/api/getcatswithsubcats", categoryControllers.getcatswithsubcats);
router.put("/api/updateCat", verifyToken, categoryControllers.updateCat);
router.delete("/api/delcat", verifyToken, categoryControllers.delcat);

module.exports = router;
