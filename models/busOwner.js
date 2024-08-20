const mongoose = require('mongoose');
const UserSchema = require('./user');

const BusOwnerSchema = new mongoose.Schema({
    buses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    }],
   
});

BusOwnerSchema.virtual('bookings', {
    ref: 'Booking',
    localField: 'buses',
    foreignField: 'bus'
});

const BusOwner = UserSchema.discriminator('BusOwner', BusOwnerSchema);

module.exports = mongoose.model('BusOwner');
