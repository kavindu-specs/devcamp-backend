const mongoose = require("mongoose") 
const geocoder = require("../utils/geocoder")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name field is required"],
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        required:[true,"email field is required"],
      
    },
    role:{
        type:String,
        enum:["user","publisher","admin"],
        default:"user"
 
    },
    password:{
        type:String,
        required:[true,'Please add a password'],
        minLength:6,
        select:false
       
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
     createdAt:{
        type:Date,
        default: Date.now
     },
   
})

UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

UserSchema.methods.getSignedJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model('User',UserSchema)