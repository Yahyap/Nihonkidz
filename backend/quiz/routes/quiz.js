const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const jwtAuth = require("../middleware/jwtAuth");

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/quiz/:id_quiz", quizController.quiz);

module.exports = router;
