//Creating Token and saving in cookies

const sendToken = (user,statusCode,res)=>{
    const token = user.getJWTToken()
    //option for cookies
    const options  = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 *60 *60 * 1000 ///If we send 7 then in this logic 7 din baad expires
        ),

        httpOnly : true
    } 
    res.status(statusCode).cookie("token",token,options).json({
        success : true, 
        user,
        token
    })
}
module.exports = sendToken;