let express = require("express");
let router = express.Router();
//Importing Methods from controllers
const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory
} = require("../controllers/category.js");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin
} = require("../controllers/auth.js");
const { getUserByID } = require("../controllers/user.js");

//Params
router.param("userId", getUserByID);
router.param("categoryId", getCategoryById);

//Actual routers

//Create
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);
//Read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);
//Update
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);
//Delete
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
