const mongoose = require("mongoose");
const timestamp = require('timestamp');
const Posts = require('./posts')
const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profile : {type : String , required : false , unique : false , default : "/users/defaultProfile.png" },
  isAadmin: { type: Boolean, default: false },
  followers : {type : [mongoose.Schema.Types.ObjectId] , required : false},
  following : {type : [mongoose.Schema.Types.ObjectId] , required : false},
  userPosts : {type : [mongoose.Schema.Types.ObjectId] , ref : 'Posts', required : false},
  savedPosts : {type : [mongoose.Schema.Types.ObjectId] , ref : "Posts",required : false},
  likedPosts : {type : [mongoose.Schema.Types.ObjectId] , required : false}
},{timestamps : true});
userSchema.plugin(timestamp)
const User = mongoose.model("User", userSchema);
module.exports = User;
