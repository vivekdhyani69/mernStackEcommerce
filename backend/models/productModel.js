const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  //product schema mei kya kya hoga product mei
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [8, "Price cat't exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    ///Images is a array of object because it contains many Images
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },

  Stock: {
    type: Number,
    required: [true, "Please Enter product stock"],
    maxLength: [4, "Stock cannot exceed 4 character"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user :{
    type :  mongoose.Schema.ObjectId,
    ref : "User",
    required : true
     },
  ///When it product is created
  createdAt: {
    type: Date,
    default: Date.now,
  },
//can also sends who user create a product then we save user details at the time of login


});

module.exports = mongoose.model("Product", productSchema);
