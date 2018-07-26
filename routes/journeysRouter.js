const journeysRouter = require('express').Router();
const { getAllJourneys, getJourneyById, addJourney } = require('../controllers');

journeysRouter.route('/')
  .get(getAllJourneys)
  .post(addJourney);

journeysRouter.route('/:_id')
  .get(getJourneyById);

module.exports = { journeysRouter };
