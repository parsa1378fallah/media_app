const express = require('express');
const { validate } = require('./controller');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator')
router.get('/' , controller.userPosts)
router.post('/' , validator.createPostValidator() , controller.validate ,controller.createPost)
router.post('/like' , controller.likePost)
router.post('/save' , controller.savePost)
router.post('/comment' , controller.newComment)
router.delete('/:postId' , controller.deletePost )
module.exports  = router;