const express = require("express");
const router = express.Router();
const subcatControllers = require("../Controllers/subcatControllers");
const verifyToken = require("./authToken");

router.post("/api/addsubcat", verifyToken, subcatControllers.addsubcats);
router.get("/api/getsubcats", subcatControllers.getsubcats);
router.put("/api/updatesubCat", verifyToken, subcatControllers.updatesubCat)
router.delete("/api/delsubcat",verifyToken, subcatControllers.delsubcat);

module.exports = router;