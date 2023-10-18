const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function isLggedIn(req , res , next) {
    const token  = req.header("x-auth-token");
    if(!token) return res.status(401).send('access denied this is message')
    try{
        const decoded = jwt.verify(token , config.get("jwt_key"))
        const user = await User.findById(decoded._id);
        req.user = user ; 
        next();

    }
    catch(ex){
        res.status(400).send('invalid token')
    }
}

async function isAdmin(req , res , next){
    if(!req.user.isAdmin) return res.status(403).send('user is not admin') ; 
    next();
}
module.exports = {
    isLggedIn , 
    isAdmin
}