const mongoose = require("mongoose");
const timestamp = require("timestamp");
const User = require("./user");
const {commentSchema} = require('./comment')
const postsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likedBy: { type: [mongoose.Schema.Types.ObjectId], required: false },
    savedBy: { type: [mongoose.Schema.Types.ObjectId], required: false },
   comments : {type:[commentSchema] ,required:false}
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", postsSchema);
module.exports = Posts;
