const usersRouter = require('express').Router();
const {
  getAllUsers, getUserByEmail, postUser, getJourneysByUsername,
} = require('../controllers');

usersRouter.route('/')
  .get(getAllUsers)
  .post(postUser);

usersRouter.route('/:belongs_to/journeys')
  .get(getJourneysByUsername);

usersRouter.route('/:email')
  .get(getUserByEmail);


module.exports = { usersRouter };
