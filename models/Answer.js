const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
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
  answer: { type: String, required: true },
  created: { type: Date, default: Date.now },
});
// answerSchema.pre(/^find/, function () {
//   this.populate({
//     path: "question",
//     // options: { select: "name" }, // <-- wrap `select` in `options` here...
//   })

// });
module.exports = mongoose.model("Answer", answerSchema);
