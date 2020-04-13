const express=require('express')
const router=express.Router();

//Bring from Controller
const { getUserByID,getUser,getAllUsers,updateUser,userPurchaseList }=require("../controllers/user.js")
const { isSignedIn,isAuthenticated,isAdmin }=require("../controllers/auth.js")

//Make a parameter with the name of 'userId',Its a middle wire
router.param("userId",getUserByID)
//Firing up the request with the Parameter 'userId'
router.get('/user/:userId',isSignedIn,isAuthenticated,getUser)

// router.get('/findAll',getAllUsers)
//'put' For updating some values of User DB
router.put('/user/:userId',isSignedIn,isAuthenticated,updateUser)
router.get('/orders/user/:userId',isSignedIn,isAuthenticated,userPurchaseList)

module.exports=router