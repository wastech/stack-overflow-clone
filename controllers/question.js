const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Question = require("../models/Question");
const User = require("../models/User");

// @desc      Get all Questions
// @route     GET /api/v1/Question
// @access    Public
exports.getQuestions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single Questions
// @route     GET /api/v1/Questions/:id
// @access    Public
exports.getQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    return next(
      new ErrorResponse(`Question not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: question });
});

// @desc      Get single Questions
// @route     GET /api/v1/Questions/:tags
// @access    Public
exports.listByTags = asyncHandler(async (req, res, next) => {
  const { tags } = req.params;
  const question = await Question.find({ tags: { $all: tags } });

  if (!question) {
    return next(
      new ErrorResponse(`Question not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: question });
});

// @desc      Get Lists of Tags
// @route     GET /api/v1/Questions/:tags
// @access    Public
exports.listTags = asyncHandler(async (req, res, next) => {
  const question = await Question.aggregate([
    { $project: { tags: 1 } },
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  if (!question) {
    return next(
      new ErrorResponse(`Question not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: question });
});

// @desc      search for Tags
// @route     GET /api/v1/Questions/:tags
// @access    Public
exports.searchTags = asyncHandler(async (req, res, next) => {
  const { tag = "" } = req.params;
  const question = await Question.aggregate([
    { $project: { tags: 1 } },
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $match: { _id: { $regex: tag, $options: "i" } } },
    { $sort: { count: -1 } },
  ]);

  if (!question) {
    return next(
      new ErrorResponse(`Question not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: question });
});

// @desc      Create new question
// @route     POST /api/v1/question
// @access    Private
exports.createQuestion = asyncHandler(async (req, res, next) => {
  const { title, content, tags } = req.body;

  const question = await Question.create({
    title,
    content,
    tags,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: question,
  });
});

// @desc      vote Question
// @route     PUT /api/v1/question/:id/upvotes
// @access    Private
exports.voteQuestion = asyncHandler(async (req, res, next) => {
  let question = await Question.findById(req.params.id);

  if (!question) {
    return next(
      new ErrorResponse(`Question not found with id of ${req.params.id}`, 404)
    );
  }

  if (!question.upvotes?.includes(req.user._id.toString())) {
    console.log("first,", question.user);
    await question.updateOne({ $push: { upvotes: req.user._id.toString() } });
    res.status(200).json({ message: "The question has been liked" });
    next();
  } else {
    await question.updateOne({ $pull: { upvotes: req.user._id.toString() } });
    res.status(200).json({ message: "The question has been disliked" });
  }
});

// @desc      vote Question
// @route     PUT /api/v1/question/:id/downvotes
// @access    Private
exports.downvoteQuestion = asyncHandler(async (req, res, next) => {
  let question = await Question.findById(req.params.id);

  if (!question) {
    return next(
      new ErrorResponse(`Question not found with id of ${req.params.id}`, 404)
    );
  }

  if (question.downvotes?.includes(req.user._id.toString())) {
    await question.updateOne({ $pull: { downvotes: req.user._id.toString() } });
    res.status(200).json({ message: "The question has been disliked" });
    next();
  } else {
    await question.updateOne({
      $push: { downvotes: req.user._id.toString() },
    });
    res.status(200).json({ message: "The question has been liked" });
  }
});

// @desc      Update question
// @route     PUT /api/v1/question/:id
// @access    Private
exports.updateQuestion = asyncHandler(async (req, res, next) => {
  let question = await Question.findById(req.params.id);

  if (!question) {
    return next(
      new ErrorResponse(`Question not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is question owner
  if (question.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this question`,
        401
      )
    );
  }

  question = await Question.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: question });
});

// @desc    Get comments by post
// @route   GET /api/v1/posts/:id/comments
// @access  Public
exports.listByUser = asyncHandler(async (req, res, next) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user)
    return next(new ErrorResponse(`User not found with id of ${id}`, 404));

  const questions = await Question.find({ user: user.id });

  res.status(200).json({ success: true, data: questions });
});

// @desc      Delete question
// @route     DELETE /api/v1/question/:id
// @access    Private
exports.deleteQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    return next(
      new ErrorResponse(`Question not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is question owner
  if (question.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this question`,
        401
      )
    );
  }

  question.remove();

  res.status(200).json({ success: true, data: {} });
});
