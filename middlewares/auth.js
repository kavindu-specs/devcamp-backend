const jwt =require("jsonwebtoken");
const User = require("../models/User");

exports.protectRoute = async(req,res,next)=>{
   let token;

    try{
      if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){

        token = req.headers.authorization.split(" ")[1];
      }

      if(!token){
        return res.status(401).json({status:401,"msg":"token is required"})
      }

      const decoded = jwt.verify(token,process.env.JWT_SECRET);

      console.log(decoded);
      req.user = await User.findById(decoded.id);
      next();


    }catch(err){
        next(err)
    }
}

exports.authorize=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(400).json({status:false,"msg":"permission denied"})
        }
        next()
    }
}