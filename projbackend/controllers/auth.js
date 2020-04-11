const User=require('../models/user.js')
const { check,validationResult} = require('express-validator');

//Authentication packages
//For creating a cookies token
var jwt = require('jsonwebtoken');
//For checking User are Online or not
var expressJwt = require('express-jwt');



exports.signup=(req,res)=>{
    //"req.body" take input from body
    // console.log("REQ BODY",req.body);
    // res.json({
    //     mesage:"SignUp route working perfectly!"
    // })
    //Errors catched 
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error:errors.array()[0].msg,
            error_param: errors.array()[0].param
        })
    }
    const user=new User(req.body)
    user.save((err,user)=>{
        if (err) {
            return res.status(400).json({
                err:"Not able to save in DB"
            })
        }
        else{
            // return res.json(user)
            return res.json({
                name: user.name,
                email:user.email,
                info: user.userInfo
            })
        }
    })
}

exports.signin=(req,res)=>{
    //Error Catched
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()
        })
    }
    //Destructuring email,password from User input to signin
    const { email,password }=req.body;
    //Finding the email,password on User DB which is putted by User
    User.findOne({email},(err,user)=>{
        //If email not matched
        if(err || !user){
            return  res.status(400).json({
                error:"User email does not exists"
            })
        }
        //If password not matched
        if (!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and password do not matched"
            })
        }
    //If all are true then Put a token to User's browser cookies

    //Creating token
    var token = jwt.sign({ _id:  user._id}, process.env.SECRET);
    //Put token in Cookie
    res.cookie("token",token,{expire: new Date() +9999});
    //Send response to the front end
    const {_id,name,email,role } = user;
    return res.json({
        token,
        user:{_id,name,email,role}
    })
    })
}


exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"User SignedOut Successfully"
    })
}


//Protected Routes



//Custom Middlewares