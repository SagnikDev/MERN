const express = require("express");
const router = express.Router();

//Importing from controllers
const { getProductByID, createProduct } = require("../controllers/product.js");
const { getUserByID } = require("../controllers/user.js");
const {
  isAdmin,
  isAuthenticated,
  isSignedIn
} = require("../controllers/auth.js");

//Params
router.param("userID", getUserByID);
router.param("productID", getProductByID);
//Actual Routes
router.post(
  "/product/create/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

module.exports = router;
