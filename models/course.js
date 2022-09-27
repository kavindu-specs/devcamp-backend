const mongoose = require("mongoose") 
const geocoder = require("../utils/geocoder")
const CourseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title field is required"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"description field is required"],
        maxlength:[500,"description can not be more than 500 characters"]
    },
    weeks:{
        type:String,
        required:[true,'Please add number of weeks']
 
    },
    tuition:{
        type:String,
        required:[true,'Please add tution cost']
       
    },
    minimumSkill:{
        type:String,
        required:[true,'Please add minimal skills'],
        enum:['beginner','intermediate','advanced']

    },
    scholarshipAvailable:{
       type:Boolean,
       default:false

    },

     createdAt:{
        type:Date,
        default: Date.now
     },
     bootcamp:{
        type:mongoose.Schema.ObjectId,
        ref:"Bootcamp",
        required:true
     }

})




module.exports = mongoose.model('Course',CourseSchema)