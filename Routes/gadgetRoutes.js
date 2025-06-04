const express = require("express");
const router = express.Router();
const upload = require("./multerConfig");
const gadgetControllers = require("../Controllers/gadgetControllers");
const verifyToken = require("./authToken");

const uploadFields = upload.fields([
    { name: 'gadgetdisplaypic', maxCount: 1 },
    { name: 'gadgetdisplaypics', maxCount: 4 },
    { name: 'hotonepic', maxCount: 1 }
]);

const newuploadFields = upload.fields([
    { name: 'newgadgetdisplaypic', maxCount: 1 },
    { name: 'newgadgetdisplaypics', maxCount: 4 },
    { name: 'newhotonepic', maxCount: 1 }
]);


router.post("/api/addgadget", verifyToken, uploadFields,gadgetControllers.addgadget);
router.delete("/api/delgadget",verifyToken, gadgetControllers.delgadget);
router.get("/api/getgadgetsbyid",  gadgetControllers.getgadgetsbyid);
router.get("/api/gfilter",  gadgetControllers.gfilter);
router.get("/api/getgadgets",  gadgetControllers.getgadgets);
router.get("/api/getsimil",  gadgetControllers.getsimil);
router.get("/api/getgadgetsbyscid",  gadgetControllers.getgadgetsbyscid);
router.put("/api/updategadget", verifyToken, newuploadFields, gadgetControllers.updategadget);
router.get("/api/searchbyname/:q", gadgetControllers.searchbyname);
router.get("/api/getgadgetsbygid", gadgetControllers.getgadgetsbygid);

module.exports = router;