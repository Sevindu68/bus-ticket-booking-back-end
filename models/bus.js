const mongoose = require('mongoose')
const Schema =mongoose.Schema
const RouteSchema=require('./route')

const busSchema= new Schema({
    busNumber:{
        type:String,
        required:true,
        unique:true
    },
    ticketPrice:{
        type:Number,
        required:true
    },
    totalSeat: {
        type:Number,
        required: true
    },
    routes:[RouteSchema.schema],
    
    
})