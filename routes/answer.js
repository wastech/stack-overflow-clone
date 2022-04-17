const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
  getAnswerByQuestionId,
  createAnswer,
  getAnswers,
  deleteAnswer,
} = require("../controllers/answer");

const Answer = require("../models/Answer");

const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(advancedResults(Answer), getAnswers)
  .post(protect, createAnswer);

router.route("/:question/answers").get(getAnswerByQuestionId);
router.route("/:id").delete(protect, deleteAnswer);

module.exports = router;
