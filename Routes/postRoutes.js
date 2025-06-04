const express = require("express");
const router = express.Router();
const postControllers = require("../Controllers/postControllers");
const upload = require("./multerConfig");

const verifyToken = require("./authToken");

const postuploadFields = upload.fields([
    { name: 'images', maxCount: 4},
    { name: 'video', maxCount: 1}
  ]);


router.post("/api/setlike", verifyToken, postControllers.setlike);
router.post("/api/setdislike", verifyToken, postControllers.setdislike);

router.get("/api/getpreviews", postControllers.getpreviews);
router.get("/api/getprbyid", postControllers.getprbyid);
router.get("/api/searchreviewq/:q", postControllers.searchreviewq);
router.post("/api/postreview", verifyToken, postuploadFields, postControllers.postreview);

module.exports = router;

