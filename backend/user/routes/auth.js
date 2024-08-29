const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const jwtAuth = require("../middleware/jwtAuth");

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.put("/updatepass", jwtAuth(), authController.updatepass);
router.put("/updatename", jwtAuth(), authController.updatename);

module.exports = router;
