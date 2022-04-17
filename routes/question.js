const express = require("express");
// const cloudinary = require("../utils/cloudinary");;
const Question = require("../models/Question");
const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  listByTags,
} = require("../controllers/question");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, advancedResults(Question), getQuestions)
  .post(protect, createQuestion);
router.get("/:tags", listByTags);
router
  .route("/:id")
  .get(protect, getQuestion)
  .put(protect, updateQuestion)
  .delete(protect, deleteQuestion);

module.exports = router;
