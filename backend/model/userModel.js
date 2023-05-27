const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET= "fdkldfdfddsjdmvhcggjjaxgffghj"
const JWT_EXPIRE="7d"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[25, "Name should less then 35 letters"],
        minLength:[5,"Name should greater then 5 letters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
      
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[6,"Password should be greater than 6 letters "],
        seleect:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
          },
          url:{
            type:String,
            required:true
          },
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken: String,
    resetPasswordExpire:Date,
       
});

// bcrypt password --> hash

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,8)
})

// Jasson WEb token 
 userSchema.methods.getJWTToken = function () {
    return jwt.sign({id:this._id},JWT_SECRET,{
        expiresIn:JWT_EXPIRE,
    })
 }

//  Compare Password

userSchema.methods.comparePassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
}



module.exports = mongoose.model('user', userSchema)