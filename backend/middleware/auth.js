const ErrorHandler = require("../utils/erorHandler");
const catchAsyncErrors = require("./catchasyncerror");
const jwt = require('jsonwebtoken')
const User = require("../model/userModel")
const JWT_SECRET= "fdkldfdfddsjdmvhcggjjaxgffghj"

 exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const {token} = req.cookies;
    
    if(!token){
        return next(new ErrorHandler("Please Login to access this", 401))

    }

    const decodeData = jwt.verify(token, JWT_SECRET);
    req.user =  await User.findById(decodeData.id)

    next();
})