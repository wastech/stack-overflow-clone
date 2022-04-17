const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
    required: true,
  },
  body: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("commentSchema", commentSchema);
