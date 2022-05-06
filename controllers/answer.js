const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Answer = require("../models/Answer");
const Question = require("../models/Question");

// @desc    Get Answers by post
// @route   GET /api/v1/posts/:id/comments
// @access  Public
exports.getAnswers = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  if (!question)
    return next(new ErrorResponse(`Post not found with id of ${id}`, 404));

  const answser = await Answer.find({ question: id });

  res.status(200).json({ success: true, data: answser });
});

// @desc    Get answers by quetion id
// @route   GET /api/v1/answer/:question/answers
// @access  Public
exports.getAnswerByQuestionId = asyncHandler(async (req, res, next) => {
  const answser = await Answer.find({
    question: req.params.question,
  }).populate({
    path: "user",
    select: "username",
  });

  if (!answser) {
    return next(
      new ErrorResponse(`No answser found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    count: answser.length,
    data: answser,
  });
});
// @desc    Create Answer
// @route   POST /api/v1/question/:id/answer
// @access  Public
exports.createAnswer = asyncHandler(async (req, res, next) => {
  const question = await Question.findById({ _id: req.body.question });
  if (!question)
    return next(
      new ErrorResponse(
        `question not found with id of ${req.body.question}`,
        404
      )
    );
  // .replace("&lt;", "<"),
  const answer = req.body.answer.replace("&lt;", "<").replace("&gt;", ">");
  const answser = await Answer.create({
    answer,
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json({ success: true, data: answser });
});

// @desc    Delete answer
// @route   DELETE /api/v1/answers/:id
// @access  Private (admin)
exports.deleteAnswer = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const answser = await Answer.findByIdAndDelete(id);

  if (!answser) {
    return next(new ErrorResponse(`Answser with id ${id} not found`, 404));
  }

  res.status(200).json({ success: true, data: {} });
});
