const express = require("express");
const router = express.Router();
const newsfeedController = require("../controllers/newsfeedController");
const jwtAuth = require("../middleware/jwtAuth");

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/home", jwtAuth(), newsfeedController.home);
router.get("/artikel/:id_artikel", jwtAuth(), newsfeedController.specificartikel);

module.exports = router;