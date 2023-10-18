const express = require('express');
const { validate } = require('./controller');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator')
const {uploadProfile}  = require('../../middlewares/uploadImage')

router.get('/' , controller.dashboard);
router.get('/:userName' , controller.profile);
router.get('/posts/saved' , controller.savedUserPosts);
router.post('/follow' , controller.follow);
router.post('/unfollow' , controller.unfollow);
router.post('/upload-profile-image', uploadProfile , controller.uploadProfile)
module.exports  = router;