const express = require('express');
const { validate } = require('./controller');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator')
router.get('/:key' , controller.search)
module.exports  = router;