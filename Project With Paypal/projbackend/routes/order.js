const express = require("express");
const router = express.Router();
//Importing controllers
const {
  getOrderByID,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
} = require("../controllers/order.js");
const {
  isAdmin,
  isAuthenticated,
  isSignedIn,
} = require("../controllers/auth.js");
const {
  getUserByID,
  pushOrderInPurchaseList,
} = require("../controllers/user.js");
const { updateStock } = require("../controllers/product.js");
//Working with parameters
router.param("userID", getUserByID);
router.param("orderID", getOrderByID);
//Actual Routes

//Create
router.post(
  "/order/create/:userID",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

//Read
router.get(
  "/orders/all/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);
//Status of order
router.get(
  "/order/status/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);

router.put(
  "/order/:orderID/status/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
