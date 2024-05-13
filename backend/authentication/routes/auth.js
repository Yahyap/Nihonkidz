const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const jwtAuth = require("../middleware/jwtAuth");

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.post("/register", authController.signup);
router.post("/login", authController.signin);
router.get("/protected", jwtAuth(), authController.protected);
router.get("/logout", jwtAuth(), authController.logout);
router.put("/updatepass", jwtAuth(), authController.updatepass);

module.exports = router;
