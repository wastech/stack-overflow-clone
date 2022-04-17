const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  body: { type: String, required: true },
  created: { type: Date, default: Date.now },
});


module.exports = mongoose.model("commentSchema", commentSchema);
