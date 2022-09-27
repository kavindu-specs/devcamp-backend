const fs = require("fs");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const colors = require("colors")

///load environment 

dotenv.config({path: './config/config.env'});

const Bootcamp = require('./models/bootcamp')
const Course = require('./models/course')


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
   })


const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8')
    )

const courses = JSON.parse(
        fs.readFileSync(`${__dirname}/_data/courses.json`,'utf-8')
        )    

    const ImportData = async()=>{
    try{
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        console.log("data imported".green.inverse)
    }catch(err){
        console.log(err);
    }
}


const Deletedata=async ()=>{
    try{
      
       await Course.deleteMany();
       await Bootcamp.deleteMany();
      console.log('Data destroyed.....'.red.inverse);
      process.exit();
    }catch(err){
      console.log(err)

    }
}

if(process.argv[2] === '-i'){
    ImportData();
}else if(process.argv[2]==='-d'){
    Deletedata();

}