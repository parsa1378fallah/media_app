const controller = require("../controller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = new (class extends controller {
  async createPost(req, res) {
    const { title, description, userId } = req.body;
    let post = new this.Posts({ title, description, author: userId });
    await this.User.findOneAndUpdate(
      { _id: userId },
      { $push: { userPosts: post._id } },
      { new: true }
    );
    let newPost = await post.save();
    await newPost.populate("author");
    this.response({
      res,
      code: 200,
      message: "post saved",
      data: { post: newPost },
    });
  }
  async userPosts(req, res) {
    let posts = await this.Posts.find({})
      .populate("author")
      .sort({ createdAt: -1 });
    if (!posts) return this.response({ res, message: "there is no post here" });
    this.response({ res, message: "this are posts", data: { posts } });
  }
  async deletePost(req, res) {
    let postId = req.params.postId;
    let post = await this.Posts.findOneAndRemove({ _id: postId });
    if (!post) return;
    const userId = post.author._id;
    await this.User.findOneAndUpdate(
      { _id: userId },
      { $pull: { userPosts: post._id } },
      { new: true }
    );
    this.response({
      res,
      message: "post deleted successfully",
      data: { post },
    });
  }
  async likePost(req, res) {
    const postId = req.body.postId;
    const userId = req.user._id;
    const post = await this.Posts.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { likedBy: userId } }
    );
    const user = await this.User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { likedPosts: postId } }
    );
    this.response({
      res,
      message: "post liked successfuly",
      data: { postId: post._id, userId: user._id },
    });
  }
  async savePost(req, res) {
    const user = req.user;
    const postId = req.body.postId;
    await this.User.findByIdAndUpdate(user._id, {
      $addToSet: { savedPosts: postId },
    });
    this.response({ res, message: "post saved", data: { postId } });
  }
  async newComment(req, res) {
    const currentUser = req.user;
    const { postId, commentBody } = req.body;
    const { firstName, lastName, profile } = currentUser;
    const comment = new this.Comment({
      firstName,
      lastName,
      profile,
      body: commentBody,
    })
    let currentPost = await this.Posts.findByIdAndUpdate(postId, {
      $push: { comments: comment },
    });
    this.response({res , messages : "کامنت ذخیره شد." , data : {comment}})
  }
})();
