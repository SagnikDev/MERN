var express=require("express")
var router = express.Router()

const {signout,signup,signin,isSignedIn }=require("../controllers/auth.js")
//Express-validator include
const { check,validationResult} = require('express-validator');

//Implementing express-validator
router.post("/signup",[
    check("name").isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
    check("email").isEmail().withMessage('email is required'),
    check("password").isLength({min: 3}).withMessage('Password should be atleast 3 char'),
],signup);

router.post('/signin',[
    check('email').isEmail().withMessage("Email is required"),
    check('password').isLength({min:1}).withMessage('Password should be required')
],signin);

router.get("/signout",signout);


//See in Postman with Header(Key=>Authorization and Value => Bearer "TokenValue")
router.get("/testRoute",isSignedIn,(req,res)=>{
    res.json(req.auth)
})


module.exports=router;