import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { connectDB } from './Config/db.js';
dotenv.config();
import foodRoute from './Routes/foodRoutes.js'
import helpingHand from './Routes/helpingHandRoute.js'



//app config
const app = express();
const port = process.env.PORT || 3000

//middleware set
app.use(express.json())
app.use(cors()) // used t help connect backend to frontend

//Conection
connectDB().then(()=>{
    
    //api
    app.use("/api/foods",foodRoute) 
    app.use("/api/HelpingHand/foods",helpingHand) 
    app.use('/images',express.static('uploads'))
    
    
    
    //making sure only after database is connected ,
    //the serverr starts to run
    app.listen(port ,()=>{
    console.log(`The Server is Running on ${port}`)
})
    
})




