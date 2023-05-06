const mongoose = require("mongoose")
const validators = require("validator")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[25, "Name should less then 35 letters"],
        minLength:[5,"Name should grater then 5 letters"]
    },
})