const mongoose = require('mongoose');
const { seedDB } = require('./seed');
const rawData = require('./testData');
const { DB_URL } = require('../config');

mongoose
  .connect(DB_URL)
  .then(() => seedDB(rawData))
  .then(() => mongoose.disconnect())
  .then(() => {
    console.log(`Successfully disconnected from ${DB_URL}`);
  })
  .catch(console.log);
