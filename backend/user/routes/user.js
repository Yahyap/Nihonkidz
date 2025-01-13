const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwtAuth = require("../middleware/jwtAuth");

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.put("/updatepass", userController.updatepass);
router.put("/updatename", userController.updatename);
router.put("/reset-password/:token", userController.resetpass);
router.post("/forgot-password", userController.forgotpass);

module.exports = router;


