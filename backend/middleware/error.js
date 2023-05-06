const ErrorHandler = require("../utils/erorHandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500,
    err.message = err.message || "Internel server error"



// Wrong Mongodb id errors 
if(err.name === "CastError"){
    const message = `Product not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message,400)
}




    res.status(err.statusCode).json({
        success:false,                
        message:err.message,
    });

}