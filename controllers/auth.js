const User =require("../models/User");

exports.register = async (req,res,next)=>{

    try{
    const {name,email,password,role}=req.body;

    const user = await User.create({name,email,password,role})
      
    getTokenResponse(user,200,res)

    }catch(err){
        next(err)
    }
   
}

exports.login = async (req,res,next)=>{

    try{
    const {email,password}=req.body;
    
    if(!email || !password){
        return res.status(400).json({"status":false,"data":"data required"}) 
    }

    const user = await User.findOne({email:email}).select("+password");
    
    if(!user){
        return res.status(422).json({"status":false,data:"Invalid data"})
    }

    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return res.status(400).json({"status":false,data:"Invalid password"})
    }
      
  
    getTokenResponse(user,200,res)
    
    }catch(err){
        next(err)
    }
   
}

const getTokenResponse = (user,statusCode,res)=>{

    try{
       
        const token = user.getSignedJwtToken()
        const options={
            expires:new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
            httpOnly:true
        }
        res.status(statusCode).cookie("token",token,options).json({success:true,token})
    }catch(err){
          
    }
}

exports.getMe=async (req,res,next)=>{

    try{
     
        const user = await User.findById(req.user.id);

        return res.status(200).json({success:true,"data":user})

    }catch(err){
          next(err)
    }
}