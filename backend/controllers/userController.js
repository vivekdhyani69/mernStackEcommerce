const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middelware/catchAsyncError");
const User = require("../models/userModel");

const sendToken = require("../utils/jwtToken");
///Makes a function of Registration : Register to user
const token = require("jsonwebtoken");
const sendEmail  = require("../utils/sendEmail")

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is sample id",
      url: "profilepicUrl",
    },
  });

  sendToken(user, 201, res);
});

//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter email or password", 401));
  }
  //otherwize
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = user.comparePassword(password); //send kra iss function ko simple password and that is return after compare both hashed and simple
 
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  ///the user is confirmed authenticate after his login password is matches to User db password

  sendToken(user, 200, res);
});

///Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token", null, {
    httpOnly: true,
    expires: new Date(0), // Set the expiration date to a past date to immediately expire the cookie
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfuly",
  });
});

//Forgooten password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }); //req se email takes and usi email k bnde ko send mail and makes resetToken
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  //otherwize if mail dal de and clickes forgotPassword
  const resetToken = user.getResetPasswordToken();

  console.log(resetToken , "vivek")

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

// console.log(resetPasswordUrl,"resetPasswordUrl")

  const message = `Your  password reset token is : \n\n ${resetPasswordUrl} \n\nIf you have not requested this email
then please ignored it `;
// console.log(message,"message")

  try {
    await sendEmail({
      email: user.email,
      subject: "King Things All Ecommerce",
      message
    });

    res.status(200).json({
      success: true,  
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});
