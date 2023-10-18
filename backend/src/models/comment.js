const mongoose = require("mongoose");
const timestamp = require("timestamp");
const commentSchema = mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    profile: String,
    body: String,
  },
  { timestamps: true }
);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment, commentSchema };
