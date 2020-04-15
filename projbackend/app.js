require('dotenv').config() //Importing .env package
const mongoose = require('mongoose'); //Importing package
const express=require('express')    //Importing package
const bodyParser=require('body-parser') //Importing package
const cookieParser=require('cookie-parser') //Importing package
const cors=require('cors') //Importing package
const app=express()
//My Routes Path
const authRoutes=require('./routes/auth.js')
const userRoutes=require('./routes/user.js')
const categoryRoutes=require('./routes/category.js')
//Connection establishment
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}).then(()=>{
    console.log('DB is CONNECTED,AWESOME!');
}).catch(()=>{
    console.log('Error! DB NOT CONNECTED');
})

//Implementing Middlewares

//bodyParser helps to take input from the body
app.use(bodyParser.json());
//cookieParser helps to put or delete some value to user browser cookie
app.use(cookieParser());
app.use(cors());

//My routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)

//proess.env.PORT,process.env.DATABASE are comming from .env file
const port=process.env.PORT

//Starting a Server
app.listen(port,()=>{
    console.log(`Server is listening at PORT ${port}`);
})