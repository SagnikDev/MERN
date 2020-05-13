const express = require("express");
const router = express.Router();


const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/auth.js");

const {getUserByID}=require("../controllers/user")
router.param("userId", getUserByID);

const {
  getToken,
  processPayment,
} = require("../controllers/paymentBRoutes.js");

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);


router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
