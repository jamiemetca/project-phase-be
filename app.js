const express = require('express')
;
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const DB_URL = process.env.DB_URL || require('./config').DB_URL
const { apiRouter } = require('./routes/apiRouter');

app.use(bodyParser.json());

app.use(cors());

mongoose.connect(DB_URL)
  .then(() => {
    console.log(`connected to ${DB_URL}`);
  })
  .catch(console.log);

app.use('/api', express.static('public'));

app.use('/api', apiRouter);

app.route('/*')
  .get((req, res, next) => {
    next({ status: 404, message: 'Page not found' });
  });

app.use((err, req, res, next) => {
  const { status, message } = err;
  err.name === 'ValidationError' || err.name === 'SyntaxError'
    ? res.status(400).send({ message: 'Bad request' })
    : err.name === 'CastError'
      ? res.status(404).send({ message: 'Page not found' })
      : res.status(status).send({ message });
});

module.exports = app;
