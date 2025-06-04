const express = require("express");
const router = express.Router();
const userreviewControllers = require("../Controllers/userreviewControllers");

const upload = require("./multerConfig");
const verifyToken = require("./authToken");


const postuploadFields = upload.fields([
    { name: 'images', maxCount: 4},
    { name: 'video', maxCount: 1}
  ]);

router.post("/api/postureview", verifyToken, postuploadFields,userreviewControllers.postureview);
router.get("/api/getureviews", userreviewControllers.getureviews);

module.exports = router;
