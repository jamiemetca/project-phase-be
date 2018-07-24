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

const addJourney = (req, res, next) => {
  const journey = new Journey(req.body)
  journey.save()
    .then((newJourney) => {
      res.status(201).send({newJourney})
    })
    .catch(console.log)
}

module.exports = { getAllJourneys, getJourneyById, addJourney }