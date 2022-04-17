const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
  getCommentByPostId,
    createComment,
  getComments,
  deleteComment,
} = require("../controllers/comment");

const Comment = require("../models/Comment");

const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(advancedResults(Comment), getComments)
  .post(protect, createComment);

router.route("/:question/comments").get(getCommentByPostId);
router.route("/:id").delete(protect, deleteComment);

module.exports = router;
