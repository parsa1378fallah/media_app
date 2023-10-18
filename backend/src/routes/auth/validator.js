const expressValidator  = require('express-validator');
const check = expressValidator.check

module.exports = new class {
    registerValidator(){
        return [
            check('email').isEmail().withMessage('email is invalid') , 
            check('firstName').not().isEmpty().withMessage('the first_name can not be empty'),
            check('lastName').not().isEmpty().withMessage('the last_name can not be empty'),
            check('userName').not().isEmpty().withMessage('the user_name can not be empty'),
            check('password').not().isEmpty().withMessage('the password can not be empty')
        ]
    }
    loginValidator(){
        return [
            check('email').isEmail().withMessage('email is invalid') , 
            check('password').not().isEmpty().withMessage('the password can not be empty')
        ]
    }
}