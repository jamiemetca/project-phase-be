const mongoose = require('mongoose');

const { Schema } = mongoose;

const JourneySchema = new Schema({
  route: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  belongs_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

module.exports = mongoose.model('journeys', JourneySchema);
