const ErrorHandler = require("../utils/erorHandler")
const catchasyncerror = require("../middleware/catchasyncerror");
const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");

// Register a  user

exports.registerUser = catchasyncerror(async(req,res,next)=>{
    const {name,email,password} = req.body;
    
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:" This is a sample id",
            url:"profilePicUrl"
        },
    });

    sendToken(user,200,res);
});

// Login User 
exports.loginUser = catchasyncerror(async (req,res,next)=>{
    const {email, password} = req.body;

    // checking if user has given password and email both

    if (!email || !password){
        return next(new ErrorHandler("Please enter email & password", 400));
      }
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));

    }

    const isPasswordMatched = user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401)) 
    }

    sendToken(user,201,res);


})