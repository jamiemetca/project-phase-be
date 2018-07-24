const { User } = require('../models')

const getAllUsers = (req, res, next) => {
    User.find()
        .then(users => {
            res.send({users})
        })
}

const getUserByUsername = (req, res, next) => {
    User.findOne(req.params)
        .then(user => {
            res.send({user})
        })
}

module.exports = {getAllUsers, getUserByUsername}