const { Journey } = require('../models')

const getAllJourneys = (req, res, next) => {
  Journey.find()
    .then(journeys => {
      res.send({ journeys })
    })
}

const getJourneyById = (req, res, next) => {
  Journey.findOne(req.params)
    .then(journey => {
      res.send({ journey })
    })
}

module.exports = { getAllJourneys, getJourneyById }