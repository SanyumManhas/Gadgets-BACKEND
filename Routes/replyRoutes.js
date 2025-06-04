const express = require("express");
const router = express.Router();

const verifyToken = require("./authToken");
const replyControllers = require("../Controllers/replyControllers");


router.post("/api/postreply",verifyToken, replyControllers.postreply);
router.get("/api/getreplies", replyControllers.getreplies);

module.exports = router;