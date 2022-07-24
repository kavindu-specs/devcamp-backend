const express = require("express") 
const dotenv = require("dotenv")
const connectDb = require("./config/db")

dotenv.config({path:'./config/config.env'})

connectDb();

const bootcamps = require("./routers/bootcamps")
const connectDB = require("./config/db")

const app = express();

app.use(express.json())
app.use('/api/v1/bootcamps',bootcamps)

const PORT = process.env.PORT ||5000
app.listen(PORT,console.log(`server is running in ${PORT}`))

process.on('unHandledRejection',(err,promise)=>{
    console.log(`Error:${err.message}`)

    server.close(()=>process.exit(1));
})

