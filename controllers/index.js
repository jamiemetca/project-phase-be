const {
  getAllUsers,
  getUserByUsername,
  postUser,
  getJourneysByUsername,
} = require('./users');
const {
  getAllJourneys,
  getJourneyById,
  addJourney,
} = require('./journeys');

module.exports = {
  getAllUsers,
  getUserByUsername,
  postUser,
  getAllJourneys,
  getJourneyById,
  getJourneysByUsername,
  addJourney,
};