const apiRouter = require('express').Router();
const { usersRouter } = require('./usersRouter');
const { journeysRouter } = require('./journeysRouter');

apiRouter.reoute('/')
  .get((req, res, next) => {
    res.render('public/index');
  });

apiRouter.use('/users', usersRouter);
apiRouter.use('/journeys', journeysRouter);


module.exports = { apiRouter };
