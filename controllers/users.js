const { User, Journey } = require('../models')

const getAllUsers = (req, res, next) => {
    User.find()
        .then(users => {
            res.send({ users })
        })
}

const getUserByUsername = (req, res, next) => {
    User.findOne(req.params)
        .then(user => {
            res.send({ user })
        })
}

const postUser = (req, res, next) => {
    const user = new User(req.body)
    user.save()
        .then(newUser => {
            res.status(201)
                .send({ newUser })
        })
        .catch(console.log)
}

const getJourneysByUsername = (req, res, next) => {
    Journey.find(req.params)
        .then(journeys => {
            res.send({ journeys })
        })
}

module.exports = { getAllUsers, getUserByUsername, postUser, getJourneysByUsername }