const mongoose= require('mongoose')
const Schema= mongoose.Schema
const userSchema=require('./user')

const normalUserSchema= new Schema({
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
})

const NormalUser = userSchema.discriminator('NormalUser',normalUserSchema)
module.exports = mongoose.model('NormalUser')