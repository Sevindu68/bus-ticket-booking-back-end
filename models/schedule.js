const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  availableSeats: {
    type: [Number],
    default: [],
  },
  bookedSeates: {
    type: [Number],
    default: [],
  },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
