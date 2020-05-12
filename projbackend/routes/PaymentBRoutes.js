const express = require("express");
const router = express.Router();
const { isAuthenticated, isSignedIn } = require("../controllers/auth.js");
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
