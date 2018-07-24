const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JourneySchema = new Schema({
  route: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  belongs_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
});

module.exports = mongoose.model("journeys", JourneySchema);
