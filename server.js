require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

mongoose.set('runValidators', true);
mongoose.connect(process.env.DATABASE_URL,  { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to database'))

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses

//Middleware that Allows server to accept JSON as body.
app.use(express.json())

const teamsRouter = require('./routes/teams')
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)
app.use('/teams', teamsRouter)


app.listen('3000', () => console.log('Server has started'))
