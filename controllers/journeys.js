const { Journey } = require('../models')

const getAllJourneys = (req, res, next) => {
  Journey.find()
    .then(journeys => {
      res.send({ journeys })
    })
    .catch(next)
}

const getJourneyById = (req, res, next) => {
  Journey.findOne(req.params)
    .then(journey => {
      if(journey === null) throw next({status:404, message: 'Page not found'})
      res.send({ journey })
    })
    .catch(next)
}

const addJourney = (req, res, next) => {
  const journey = new Journey(req.body)
  journey.save()
    .then((newJourney) => {
      res.status(201).send({newJourney})
    })
    .catch(next)
}

module.exports = { getAllJourneys, getJourneyById, addJourney }