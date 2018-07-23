const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    xp: {
        type: Number,
        required: true,
        default: 0
    },
    achievements: {
        type: [String],
        required: true,
        default: ['On a mission!']
    }
})


module.exports = mongoose.model('users', UserSchema)