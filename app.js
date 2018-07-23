const express = require('express')
const app = express()
const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL || require('./config').DB_URL
const bodyParser = require('body-parser')
const cors = require('cors')
const {apiRouter} = require('./routes/api')

app.use(bodyParser.json())

app.use(cors())

app.use('api', apiRouter)

mongoose.connect(DB_URL)
    .then(() => {
        console.log(`connected to ${DB_URL}`)
    })
    .catch(console.log)

module.exports = app