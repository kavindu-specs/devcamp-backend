const BootCamp =require("../models/bootcamp")

exports.getCamps = async (req,res,next)=>{

    const bootsCamps = await BootCamp.find();
    try{
        res.status(200).json({"status":true,"data":bootsCamps}) 
    }catch(err){
        res.status(400).json({"status":false,"msg":"error in getting data"}) 
    }
   
}
exports.getCamp = async (req,res,next)=>{
    const bootsCamp = await BootCamp.findById(req.params.id);
    try{

        if(!bootsCamp){
            res.status(204).json({"status":false});
        }
        res.status(200).json({"status":true,"data":bootsCamp}) 
    }catch(err){
        res.status(400).json({"status":false,"msg":"error in getting data"}) 
    }

   
}

exports.createCamp = async (req,res,next)=>{
    const bootCamps = await BootCamp.create(req.body);
    res.status(201).json({"status":true,"msg":"create Camp","data":bootCamps})
}

exports.updateCamp = async (req,res,next)=>{
    const bootsCamp = await BootCamp.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    try{

        if(!bootsCamp){
            res.status(204).json({"status":false});
        }
        res.status(200).json({"status":true,"data":bootsCamp}) 
    }catch(err){
        res.status(400).json({"status":false,"msg":"error in getting data"}) 
    } 
}

exports.deleteCamp = async (req,res,next)=>{ 
    const bootsCamp = await BootCamp.findByIdAndDelete(req.params.id);
    try{

    if(!bootsCamp){
        res.status(204).json({"status":false});
    }
    res.status(200).json({"status":true,"data":{}}) 
}catch(err){
    res.status(400).json({"status":false,"msg":"error in deleting data"}) 
}   
}