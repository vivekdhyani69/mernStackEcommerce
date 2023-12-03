class ErrorHandler extends Error {
   
    constructor(message,statusCode){
        super(message)///Basically this super is used to call the constructor of base class
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor)
    }

}

module.exports = ErrorHandler