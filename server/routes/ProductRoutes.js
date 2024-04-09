const express = require("express");
const router = express.Router();
const requireSignIn = require("../middlewares/authMiddleware");
const IsAdmin = require("../middlewares/Isadmin");
const {
  CreateProductController,
  GetProductController,
  GetSingleProductController,
  GetProductPhotoController,
  DeleteProductController,
  UpdateProductController,
  ProductFilterController,
  ProductCountController,
  ProductPerController,
  ProductSearchController,
  SimilarProductController,
  CatergoryWiseProductController,
  GetUserProductController,
  createProductReview,
  deleteReview
} = require("../controllers/ProductController");
const formidable = require("express-formidable");
//routes
//create product
router.post(
  "/create-product",
  requireSignIn,
  formidable(),
  CreateProductController
);

//get All products 
router.get("/get-product/:id", GetProductController);

// get single Product
router.get("/getSingle-product/:slug", GetSingleProductController);

//get photo

router.get("/get-productPhoto/:id", GetProductPhotoController);

//delete delete
router.delete("/Delete-product/:id", requireSignIn, DeleteProductController);

//update
router.put(
  "/update-product/:id",
  requireSignIn,
  formidable(),
  UpdateProductController
);

// get by filter


router.post("/productfilter", ProductFilterController);

router.get("/product-count", ProductCountController);

router.get("/product-list/:page/:id", ProductPerController);

// router.get("/product-listnotlogin/:page", ProductPerControllernotlogin);

router.get("/product-search/:Keyword/:id", ProductSearchController);

router.get("/product-similar/:pid/:cid", SimilarProductController);

//catergory wise get product

router.get("/product-CategoryWise/:id/:pid", CatergoryWiseProductController);

//get products created by user
router.get("/get-product-user/:id", GetUserProductController);

//create review
router.put("/get-product/:pid/:uid/create-review", createProductReview)
//delete review
router.delete("/get-product/:pid/:uid/delete-review/:rid", deleteReview)

module.exports = router;
