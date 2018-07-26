const {
  getAllUsers,
  getUserByEmail,
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
  getUserByEmail,
  postUser,
  getAllJourneys,
  getJourneyById,
  getJourneysByUsername,
  addJourney,
};