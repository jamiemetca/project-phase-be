const apiRouter = require('express').Router();
const { usersRouter } = require('./usersRouter');
const { journeysRouter } = require('./journeysRouter');


// main page, create index file with list of apis, if ejs need to do view ingine as ejs in app
// apiRouter.route('/')
//     .get((req, res, next) => {
//         res.render('public/index')
//     })

apiRouter.use('/users', usersRouter);
apiRouter.use('/journeys', journeysRouter);


module.exports = { apiRouter };
