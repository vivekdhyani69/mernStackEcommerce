const express = require("express");
const { getAllProduct,createProduct, updateProduct,deleteproducts, getSingleProduct } = require("../controllers/productController");
const { isAuthenticatedUser , authorizeRoles } = require("../middelware/auth");

const router = express.Router();///makes router 

router.route("/products").get(getAllProduct)

router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)

router.route("/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,deleteproducts)
.get(getSingleProduct)


module.exports = router
