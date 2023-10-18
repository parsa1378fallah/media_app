const controller = require("../controller");
const multer = require("multer");
const upload = multer({ dest: "upload/" });
module.exports = new (class extends controller {
  async dashboard(req, res) {
    const { firstName, lastName, userName, email, _id, profile } = req.user;
    this.response({
      res,
      messages: "کاربر لاگین است",
      data: { firstName, lastName, userName, email, userId: _id, profile },
    });
  }
  async profile(req, res) {
    let userName = req.params.userName;
    const { _id } = req.user;
    let user = await this.User.findOne({ userName }).populate("userPosts");
    if (!user)
      return this.response({
        res,
        code: 404,
        message: "there is not such user",
      });
    const isFollowing = user.followers.includes(_id);
    user.userPosts.sort((a, b) => b.createdAt - a.createdAt);
    this.response({
      res,
      message: "this is your user",
      data: { user, isFollowing },
    });
  }

  async savedUserPosts(req, res) {
    const userId = req.user.id;
    const user = await this.User.findById(userId).populate("savedPosts");
    let posts = user.savedPosts;
    posts = await Promise.all(
      posts.map(async (post) => {
        try {
          const author = await this.User.findOne({ _id: post.author });

          if (author) {
            post.author = author;
          }

          return post;
        } catch (err) {
          console.error(err);
        }
      })
    );
    this.response({
      res,
      message: "user",
      data: { posts },
    });
  }

  async follow(req, res) {
    const followingUserId = req.body.userId;
    const userLoginedId = req.user._id;
    await this.User.findOneAndUpdate(
      { _id: followingUserId },
      { $push: { followers: userLoginedId } }
    );
    await this.User.findOneAndUpdate(
      { _id: userLoginedId },
      { $push: { following: followingUserId } }
    );
    this.response({
      res,
      message: "the user followed",
      data: { isFollowing: true },
    });
  }
  async unfollow(req, res) {
    const followingUserId = req.body.userId;
    const userLoginedId = req.user._id;
    await this.User.findOneAndUpdate(
      { _id: followingUserId },
      { $pull: { followers: userLoginedId } }
    );
    await this.User.findOneAndUpdate(
      { _id: userLoginedId },
      { $pull: { following: followingUserId } }
    );
    this.response({
      res,
      message: "the user followed",
      data: { isFollowing: false },
    });
  }
  async uploadProfile(req, res) {
    const user = req.user;
    const profileName = req.profileName;
    await this.User.findByIdAndUpdate(user._id, {
      profile: `/users/${profileName}`,
    });
    this.response({
      res,
      message: "image uploaded",
      data: { profile: `/users/${profileName}` },
    });
  }
})();
