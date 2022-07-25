const errorHandler = (err,req,res,next)=>{
    console.log("error handler");
    return res.status(err.statusCode || 500).json({
        success:false,
        error:err.message || "server Error"
    })
}

module.exports = errorHandler