//Importing Models
const User=require('../models/user.js')
const Order=require("../models/order.js")
//Finding an User by Object PARAM
exports.getUserByID=(req,res,next,id)=>{
    User.findById({_id:id}).exec((err,user)=>{
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

//For Updating
exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if(err || !user){
                res.status(400).json({
                    err:"You are not authorized to Update this user!!"
                })
            }
            user.salt=undefined
            user.encry_password=undefined
            res.json(user)
        } 
        )   
}

//User Purchase List using "populate" method
exports.userPurchaseList=(req,res)=>{
    Order.find({user:req.profile._id})
    .populate("user"," _id name").exec((err,order)=>{
        if(err){
            return res.status(400).json({
                err : "No Order in this account"
            })
        }
        return res.json(order)
    })
}
//Make a middlewire to push orders in Purchaselist of User
exports.pushOrderInPurchaseList=(req,res,next)=>{
    let purchases=[]
    req.body.order.products.forEach(product =>{
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id
        })
    })
    //Store into DB
    User.findOneAndUpdate(
       { _id : req.profile._id,},
       {$push:{purchased:purchases} },
       { new: true},
       (err,purchase)=>{
           if(err){
               return res.status(800).json({
                   err : "Unable to Save Purcase List"
               })
           }
           next()
       }
    )
}