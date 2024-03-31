const express = require("express");
const {
  CreateCategoryController,
  UpdateCategoryController,
  GetAllCategoryController,
  GetSingleCategoryController,
  DeleteCategoryController,
} = require("../controllers/CategoryController");
const requireSignIn = require("../middlewares/authMiddleware");
const IsAdmin = require("../middlewares/Isadmin");

const router = express.Router();

//routes

//create category

router.post(
  "/create-category",
  requireSignIn,
  IsAdmin,
  CreateCategoryController
);

//update category

router.put(
  "/update-category/:id", // pass slug as params
  requireSignIn,
  IsAdmin,
  UpdateCategoryController
);

//get all category
// we need to show category even if the user is not login in hence no middleware

router.get("/GetAll-category", GetAllCategoryController);

// get single category
router.get("/GetSingle-category/:slug", GetSingleCategoryController);

//delete category

router.delete(
  "/Delete-category/:id",
  requireSignIn,
  IsAdmin,
  DeleteCategoryController
);

module.exports = router;
