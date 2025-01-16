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

module.exports = router;


