const express = require("express");
const router = express.Router();

//Importing from controllers
const {
  getProductByID,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories
} = require("../controllers/product.js");
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

//Create
router.post(
  "/product/create/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
//Read
router.get("/product/:productID", getProduct);
router.get("/product/photo/:productID", photo);
//Delete Route
router.delete(
  "/product/:productID/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//Update Route
router.put(
  "/product/:productID/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//Listing Route
router.get("/products", getAllProducts);
router.get("/products/categories",getAllUniqueCategories)


module.exports = router;
