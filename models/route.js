const mongoose = require("mongoose");
const ScheduleSchema = require("./schedule");
const Schema = mongoose.Schema;

const routeShema = new Schema({
  departureLocation: {
    type: String,
    required: true,
  },
  arrivalLocation: {
    type: String,
    required: true,
  },
  schedules: [ScheduleSchema.schema],
});

module.exports = mongoose.model("Route", routeShema);
