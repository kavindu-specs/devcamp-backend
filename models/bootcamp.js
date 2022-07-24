const mongoose = require("mongoose") 

const BootCampScheama = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name field is required"],
        unique:true,
        trim:true,
        maxlength:[50,"name can not be more than 50 characters"]
    },
    slug:String,
    description:{
        type:String,
        required:[true,"description field is required"],
        maxlength:[500,"description can not be more than 500 characters"]
    },
    website:{
        type:String,
    //     match:["https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)",
    //              "url not matched"]
    // },
    },
    email:{
        type:String,
       
    },
    address:{
        type:String,

    },
    phone:{
       type:String,

    },
    location:{
        type:{
            type:String,
            enum:["Point"],
            required:false,
       },
       coordinates:{
        type:["number"],
        required:false,
        index:"2dsphere"
       },

       formattedAddress:String,
       street:String,
       city:String,
       state:String,
       zipcode:String,
       country:String


    },
    careers:{
        type:[String],
        required:true,
        enum:[

            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            "Business",
            "Other"
        ]
    },
    averageRating:{
        type:Number,
        min:[1,'Rating must be 1'],
        max:[10,'Rating must cannot be 10']
    },
    averageCost:Number,
    photo:{
        type:String,
        default:'no-photo.jpg'
    },
    housing:{
       type:Boolean,
       default:false
    },
    jobAssistance:{
        type:Boolean,
        default:false
     }, 
     jobGuarantee:{
        type:Boolean,
        default:false
     },
     acceptGi:{
        type:Boolean,
        default:false
     },
     acceptGi:{
        type:Boolean,
        default:false
     },
     createdAt:{
        type:Date,
        default: Date.now
     }
})
module.exports = mongoose.model('Bootcamp',BootCampScheama)