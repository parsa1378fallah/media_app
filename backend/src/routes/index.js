const express = require('express');
const router = express.Router();
const {isLggedIn} = require('../middlewares/auth')
const authRouter = require('./auth');
const userRouter = require('./user');
const postsRouter = require('./posts')
const searchRouter  = require('./search')
router.use('/auth' , authRouter)
router.use('/user', isLggedIn , userRouter)
router.use('/posts' , isLggedIn , postsRouter)
router.use('/search' , isLggedIn , searchRouter)
module.exports = router;
