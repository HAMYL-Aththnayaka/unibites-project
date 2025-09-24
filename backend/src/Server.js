import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const app = express();

const port = process.env.PORT | 3000

app.listen(port ,()=>{
    console.log(`The Server is Running on ${port}`)
})
