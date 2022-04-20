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
  voteQuestion,
  listTags,
  listByUser,
  searchTags,
  downvoteQuestion,
} = require("../controllers/question");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, advancedResults(Question), getQuestions)
  .post(protect, createQuestion);
// router.get("/listTags", listTags);
// router.get("/:tags", listByTags);

router.route("/listTags").get(listTags);

router
  .route("/:id")
  .get(protect, getQuestion)
  .put(protect, updateQuestion)
  .delete(protect, deleteQuestion);

router.route("/upvote/:id").post(protect, voteQuestion);
router.route("/downvote/:id").post(protect, downvoteQuestion);

router.route("/user/:username").get(listByUser);
router.route("/qtags/:tags").get(listByTags);

router.route("/tags/:tag").get(searchTags);
module.exports = router;
