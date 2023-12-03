const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
///Only login user can access this routes
exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies

    if(!token){
        return next(new ErrorHandler("Please Login to access this resource", 401))
    }
    //istly verify and then accessed to protected route
    const decodeData =  jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decodeData.id);//basically jo id jwt.sign k ander pass ki that id
    //jb tk login rahega tb tk user ka data access
    next() 
   
})

///makes a function of admin and user roles and access specific control 
exports.authorizeRoles = (...roles)=>{//checks in database roles user or admin 
return (req,res,next)=> {
    if(!roles.includes(req?.user.role)){
        return next (
            new ErrorHandler(
                `Role : ${req.user.role} is not allowed to access their resource`,
                403
            )
        )
    }
    next()

}

}