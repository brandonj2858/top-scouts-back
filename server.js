require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,  { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to database'))

//Middleware that Allows server to accept JSON as body.
app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen('3000', () => console.log('Server has started'))
