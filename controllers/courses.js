const errorResponse = require("../utils/errorResponse")
const Course =require("../models/course");

const { query } = require("express");

exports.getCourses = async (req,res,next)=>{

    try{

        const bootcamp_id = req.params.bootcamp;
        let query = Course.find().populate({path:"bootcamp",select:"name"});

      
        const page = parseInt(req.query.page,10)||1;
        const limit = parseInt(req.query.limit,10)||10;

        const skip = (page-1)*limit;

        query = query.skip(skip).limit(limit);

        const courses = await query;
        return res.status(200).json({"status":true,"data":courses}) 
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

exports.getBootcampsInRadius = async (req,res,next)=>{


    try{console.log(req);
       const {zipcode,distance} = req.params;

       const loc = await geocoder.geocode(zipcode);
       const lnt = loc[0].latitude;
       const lng = loc[0].longitude;

       const radius = distance/3963;

       const bootcamps = await BootCamp.find({ 
         location:{$geoWithin:{$centerSphere:[[lng,lnt],radius]}}
       })

       if(!bootcamps){
        return res.status(204).json({"status":false});
     }else{
        return res.status(200).json({"status":true,"data":bootcamps}) 
     }

    }catch(err){
        next(err);
    }
}