const journeysRouter = require('express').Router()
const { getAllJourneys, getJourneyById } = require('../controllers')

journeysRouter.route('/')
  .get(getAllJourneys)

journeysRouter.route('/:_id')
  .get(getJourneyById)

module.exports = { journeysRouter }