import mongoose from 'mongoose'

export const  connectDB= async()=>{
    await mongoose.connect('mongodb+srv://Unibites:0701160679@cluster0.fjiz1bb.mongodb.net/uniBite').then(()=>{
        console.log(`The DB Connected`)
    })}