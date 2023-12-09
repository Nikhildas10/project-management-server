//load .env file
require("dotenv").config()

//import express and cors
const express=require("express")
const cors=require("cors") 

const routes=require("./routes/routes")
require("./db/connection")
//create server
const projectServer=express()

//use
projectServer.use(cors())

//convert incoming json data to js data
projectServer.use(express.json())

//export uploads folder to frontend
projectServer.use('/uploads',express.static('./uploads'))

projectServer.use(routes)
//port
const PORT=4000 || process.env.PORT
projectServer.listen(PORT,()=>{
    console.log(`server started at port:${PORT}`);
})

//resolve api requests
projectServer.get('/',(request,response)=>{
    response.send("<h1>hello world</h1>")
})