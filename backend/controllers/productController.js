//makes all function logics in controller folder
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middelware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

//Firstlly Creates Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;//save krade the at time of login
  
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get All Products (Read by all admin and users)
exports.getAllProduct = catchAsyncErrors(async (req, res) => {
  
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
  const getProducts= await apiFeatures.query;
//console.log(getProducts)

  res.status(200).json({success : true,getProducts });
});
//get singleProduct by detail

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

  const getSingleProduct = await Product.findById(req.params.id);

  if (!getSingleProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    getSingleProduct, ///Basicaly jo Single product nikla hai use response mei send krdo
  });
});

//Update the Product --Admin Route
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    //options
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
    productCount
  });
});
//Delete any Products By admin
exports.deleteproducts = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
