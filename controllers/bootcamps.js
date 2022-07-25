const errorResponse = require("../utils/errorResponse")
const BootCamp =require("../models/bootcamp")

exports.getCamps = async (req,res,next)=>{

    try{
        const bootsCamps = await BootCamp.find();
        return res.status(200).json({"status":true,"data":bootsCamps}) 
    }catch(err){
        next(err)
    }
   
}
exports.getCamp = async (req,res,next)=>{
    
    try{
        const bootsCamp = await BootCamp.findById(req.params.id);

        if(!bootsCamp){
            return next(new errorResponse(`bootcamp not found ${req.params.id}`,404));
        }
        return res.status(200).json({"status":true,"data":bootsCamp}) 
    }catch(err){
        return next(new errorResponse(`bootcamp not found ${req.params.id}`,404));
    }

   
}

exports.createCamp = async (req,res,next)=>{
    try{
        const bootCamps = await BootCamp.create(req.body);
        return res.status(201).json({"status":true,"msg":"create Camp","data":bootCamps})
    }catch(err){
        next(err);
    }
   
}

exports.updateCamp = async (req,res,next)=>{
    try{
    const bootsCamp = await BootCamp.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
   

        if(!bootsCamp){
           return res.status(204).json({"status":false});
        }
        return res.status(200).json({"status":true,"data":bootsCamp}) 
    }catch(err){
        next(err);
       
    } 
}

exports.deleteCamp = async (req,res,next)=>{ 
   
    try{
        const bootsCamp = await BootCamp.findByIdAndDelete(req.params.id);

    if(!bootsCamp){
       return res.status(204).json({"status":false});
    }else{
       return res.status(200).json({"status":true,"data":{}}) 
    }
    
}catch(err){
    next(err);
}   
}