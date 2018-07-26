const usersRouter = require('express').Router();
const {
  getAllUsers, getUserByUsername, postUser, getJourneysByUsername,
} = require('../controllers');

usersRouter.route('/')
  .get(getAllUsers)
  .post(postUser);

usersRouter.route('/:belongs_to/journeys')
  .get(getJourneysByUsername);

usersRouter.route('/:username')
  .get(getUserByUsername);


module.exports = { usersRouter };
