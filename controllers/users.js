const { User } = require('../models')

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

module.exports = { getAllUsers, getUserByUsername, postUser }