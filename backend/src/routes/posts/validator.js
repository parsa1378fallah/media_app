const expressValidator  = require('express-validator');
const check = expressValidator.check

module.exports = new class {
    createPostValidator(){
        return [
            check("title").not().isEmpty().withMessage("title of post can not be empty"),
            check("description").not().isEmpty().withMessage("description of post can not be empty"),
        ]
    }
}