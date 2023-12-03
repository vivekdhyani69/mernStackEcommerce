module.exports = theFunc => (req,res,next)=>{///Handles error of Try and catch

    ///The func insider function is try block ka function (Assumes it )
Promise.resolve(theFunc(req,res,next)).catch(next)///if it fails then cartch

}