const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seats: {
        type: [Number],
        required: true
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
