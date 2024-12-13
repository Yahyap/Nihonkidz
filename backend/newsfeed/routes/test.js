const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");
const jwtAuth = require("../middleware/jwtAuth");

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/forgot-password", testController.forgotPass);

module.exports = router;
