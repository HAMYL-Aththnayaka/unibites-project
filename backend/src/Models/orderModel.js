import mongoose from 'mongoose'

const orderSchem= new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required
    }
})