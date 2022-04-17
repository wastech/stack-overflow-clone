const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Comment = require("../models/Comment");
const Question = require("../models/Question");

// @desc    Get comments by post
// @route   GET /api/v1/posts/:id/comments
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await Question.findById(id);
  if (!post)
    return next(new ErrorResponse(`Post not found with id of ${id}`, 404));

  const comments = await Comment.find({ question: id });

  res.status(200).json({ success: true, data: comments });
});

// @desc    Get comments by video id
// @route   GET /api/v1/comments/:question/question
// @access  Public
exports.getCommentByPostId = asyncHandler(async (req, res, next) => {
  const comment = await Comment.find({
    question: req.params.question,
  }).populate({
    path: "user",
    select: "username",
  });

  if (!comment) {
    return next(
      new ErrorResponse(`No comment found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
});
// @desc    Create comment
// @route   POST /api/v1/posts/:id/comments
// @access  Public
exports.createComment = asyncHandler(async (req, res, next) => {
  const question = await Question.findById({ _id: req.body.question });
  if (!question)
    return next(
      new ErrorResponse(
        `question not found with id of ${req.body.question}`,
        404
      )
    );

  const comment = await Comment.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json({ success: true, data: comment });
});

// @desc    Delete Comment
// @route   DELETE /api/v1/comments/:id
// @access  Private (admin)
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const comment = await Comment.findByIdAndDelete(id);

  if (!comment) {
    return next(new ErrorResponse(`Comment with id ${id} not found`, 404));
  }

  res.status(200).json({ success: true, data: {} });
});
