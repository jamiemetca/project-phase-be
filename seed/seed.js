const mongoose = require('mongoose');
const { User, Journey } = require('../models');
const { createUserLookup, formatJourneyData } = require('../utils');

const seedDB = ({ userData, journeyData }) => mongoose.connection
  .dropDatabase()
  .then(() => User.insertMany(userData))
  .then((userDocs) => {
    const userLookup = createUserLookup(userDocs, journeyData);
    return Promise.all([
      userDocs,
      Journey.insertMany(formatJourneyData(journeyData, userLookup)),
    ]);
  })
  .catch(console.log);

module.exports = { seedDB };
