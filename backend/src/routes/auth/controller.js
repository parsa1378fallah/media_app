const controller = require('../controller') ; 
const bcrypt  = require('bcryptjs') ; 
const jwt = require('jsonwebtoken') ;
const config = require('config')
module.exports = new (class extends controller{
    async register(req , res ){
       let user = await this.User.findOne({email : req.body.email})
       if(user) return this.response({res , code : 400 , message : 'this user already registered ' , })
       const {email  , firstName , lastName , password , userName } = req.body ; 
       user = new this.User({email  , firstName , lastName , password , userName})
       const  salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(user.password , salt)
       await user.save();
       this.response({res , code : 200 , message : "user successfuly registered" , data : {email , firstName , lastName , userName }})
    }
    async login(req , res){
       let user = await this.User.findOne({email : req.body.email})
       if(!user) return this.response({res , code:400 , message : "email or password is invalid"})
       const isVAlid = await bcrypt.compare(req.body.password , user.password) ;
       if(!isVAlid) return this.response({res , code:400 , message : "email or password is invalid"})
        const token  = jwt.sign({_id : user._id} , config.get("jwt_key"))
        const {email , userName , firstName , lastName , _id , profile }  = user ; 
        this.response({res , message : "user successfuly logined" ,data : {token , email ,userName , firstName , lastName , userId : _id , profile }})
    }
})()