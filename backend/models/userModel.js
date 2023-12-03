const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required :[true," Please Enter Your Name"],
        maxLength :[30,"Name can't be exceed 30 character"],
        minLength :[4, "Name should have more then 4 character"],
    },
    email :{
        type : String,
        required : [true,"Please Enter Your Email"],
        unique: true,
        validate : [validator.isEmail, "Please Enter a valid email"]
    },
    password : {
        type : String,
        required :[true ,"Please Enter Your Password"],
        minLength : [8,"Password should be greater then 8 character"],
        select : false,///Means if kisi ne find kra user ka data then password is not selected
    },
    avatar :  {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },

role :{
    type : String,
    default : "user"
},
resetPasswordToken : String,
resetPasswordExpire : Date


})

//Makes your password encrypted
userSchema.pre("save",async function(next){//userSchema save hone se pehle bcryped

if(!this.isModified("password")){
next()
}

  this.password  = await bcrypt.hash(this.password , 10)
})


///Jwt token
userSchema.methods.getJWTToken = function(){
return jwt.sign({id : this._id},process.env.JWT_SECRET,{
  expiresIn : process.env.JWT_EXPIRE,
})//makes a token(Unique key for each and every user)

}

//compare password
userSchema.methods.comparePassword = function(enteredPassword){

  return bcrypt.compare(enteredPassword, this.password)//compare hashed password and simple
}



  //Generating password Reset token
  userSchema.methods.getResetPasswordToken = function(){
  //Generating token
  const resetToken = crypto.randomBytes(20).toString("hex");//that creates a reset token

  //Hashing and adding resetPasswordtoken in user Schema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

      // Setting reset token and expiration time in the user schema
     
      this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes in milliseconds
  
  return resetToken;
  }

module.exports = mongoose.model("User",userSchema)