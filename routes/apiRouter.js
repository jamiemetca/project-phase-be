const apiRouter = require('express').Router()
const {usersRouter} = require('./usersRouter')


//main page, create index file with list of apis, if ejs need to do view ingine as ejs in app
// apiRouter.route('/')
//     .get((req, res, next) => {
//         res.render('public/index')
//     })

apiRouter.use('/users', usersRouter)


module.exports = {apiRouter}