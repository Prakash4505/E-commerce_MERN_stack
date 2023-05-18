const mongoose = require("mongoose")
const validators = require("validator")

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
})