const express = require('express')
const app = express()
const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL || require('./config').DB_URL
const bodyParser = require('body-parser')
const cors = require('cors')
const {apiRouter} = require('./routes/apiRouter')

app.use(bodyParser.json())

app.use(cors())

mongoose.connect(DB_URL)
    .then(() => {
        console.log(`connected to ${DB_URL}`)
    })
    .catch(console.log)

app.use('/api', apiRouter)

app.route('/*')
    .get((req, res, next) => {
        next({status: 404, message: 'Page not found'})
    })

app.use((err, req, res, next) => {
    console.log(err)
})

module.exports = app