const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Question = require("../models/Question");

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

// @desc      Update question
// @route     PUT /api/v1/question/:id
// @access    Private
exports.updateQuestion= asyncHandler(async (req, res, next) => {
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
  if (question.user.toString() !== req.user.id ) {
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


