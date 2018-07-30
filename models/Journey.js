const mongoose = require("mongoose");

const { Schema } = mongoose;

const JourneySchema = new Schema({
  route: { type: [
    {
      lat: Number,
      long: Number,
      time: Number,
    }
  ],
  required: true,
},
  mode: {
    type: String,
    required: true,
  },
  belongs_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("journeys", JourneySchema);
