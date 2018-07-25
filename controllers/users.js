const { User, Journey } = require('../models')

const getAllUsers = (req, res, next) => {
    User.find()
        .then(users => {
            res.send({ users })
        })
        .catch(next)
}

const getUserByUsername = (req, res, next) => {
    User.findOne(req.params)
        .then(user => {
            if(user === null) throw next({status: 404, message: 'Page not found'});
            res.send({ user })
        })
        .catch(next)
}

const postUser = (req, res, next) => {
    const user = new User(req.body)
    user.save()
        .then(newUser => {
            res.status(201)
                .send({ newUser })
        })
        .catch(next)
}

const getJourneysByUsername = (req, res, next) => {
    User.findOne({_id: req.params.belongs_to})
        .then(user => {
            if(user === null) throw next({status: 404, message: 'Page not found'});
            return Journey.find(req.params)
        })
        .then(journeys => {
            res.send({ journeys })
        })
        .catch(next)
    
}

module.exports = { getAllUsers, getUserByUsername, postUser, getJourneysByUsername }