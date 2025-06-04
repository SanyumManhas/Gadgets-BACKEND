const express = require('express');
const router = express.Router();
const verifyToken = require("./authToken");

const userControllers = require('../Controllers/userControllers');

router.post("/api/createUser", userControllers.createUser);
router.put("/api/updateUser", verifyToken, userControllers.updateUser);
router.post("/api/loginUser", userControllers.loginUser);
router.get("/api/getusers", verifyToken, userControllers.getusers);
router.get("/api/getubyid", userControllers.getuserbyid);
router.delete("/api/deluser", verifyToken, userControllers.deluser);

router.post("/api/logout", (req, res) => {
  res.clearCookie('token', {
    path: '/',
    httpOnly: true,
    secure: false, // true if using HTTPS
    sameSite: 'Lax'
  });
  res.send({ success: true });
});


module.exports = router;