'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import logger from 'morgan'
import routes from './routes'
import config from './../config'

const app = express()
const port = process.env.PORT || 3000

mongoose.Promise = require('bluebird')
const mongoUri = process.env.MONGO_URL || config.mongoUri
mongoose.connect(mongoUri, { useMongoClient: true })
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`)
})

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'))
}

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

routes(app)

app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        return res.status(err.status || 500).json({ message: err.message, error: err })
    } else {
        return res.status(err.status || 500).json({ message: err.message, error: {} })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})

export default app