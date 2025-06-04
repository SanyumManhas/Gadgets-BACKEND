const express = require("express");
const router = express.Router();
const likesController = require("../Controllers/likesController");
const verifyToken = require("./authToken");

router.post("/api/handlelikes", verifyToken, likesController.handlelikes)
router.get("/api/getulike", verifyToken, likesController.getulike)

module.exports = router;