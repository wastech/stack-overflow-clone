
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("answerSchema", answerSchema);
