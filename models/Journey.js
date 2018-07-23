const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JourneSchema = new Schema ({
    route: {
        type: [{long: Number, lat: Number}], //may end up an encoded string
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    belongs_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
})

module.exports = mongoose.model('journeys', JourneySchema)