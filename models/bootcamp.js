const mongoose = require("mongoose") 
const geocoder = require("../utils/geocoder")
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
     user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
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


// Geocode & create location field
BootCampScheama.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
      street: loc[0].streetName,
      city: loc[0].city,
      state: loc[0].stateCode,
      zipcode: loc[0].zipcode,
      country: loc[0].countryCode
    };
  
    // Do not save address in DB
    this.address = undefined;
    next();
  });

module.exports = mongoose.model('Bootcamp',BootCampScheama)