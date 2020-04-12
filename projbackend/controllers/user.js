//Importing User Model
const User=require('../models/user.js')

//Finding an User by Object PARAM
exports.getUserByID=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                err:"No User Found in DB"
            })
        }
        //If found Save it to req object
        req.profile=user
    })
    next()
}
//Another method
exports.getUser=(req,res)=>{
    req.profile.salt=undefined
    req.profile.encry_password=undefined
    req.profile.createdAt=undefined
    req.profile.updatedAt=undefined
    res.json(req.profile)
}

//Getting all users in User DB
exports.getAllUsers=(req,res)=>{
    User.find({},'name email',{skip : 1}).exec((err,users)=>{
        if(err || !users){
            res.status(400).json({
                err:"No Datas Found"
            })
        }
        res.json(users)
    })
}

  