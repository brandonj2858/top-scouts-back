require('dotenv').config()
const Team = require('./models/team')

const fetch = require('node-fetch');
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


fetch('https://api.collegefootballdata.com/roster?team=arkansas&year=2019')
  .then(res => res.json())
  .then(resObj => db.collection('players').insertMany(resObj))







//Middleware that Allows server to accept JSON as body.
app.use(express.json())

const teamsRouter = require('./routes/teams')
const usersRouter = require('./routes/users')
const playersRouter = require('./routes/players')

app.use('/users', usersRouter)
app.use('/teams', teamsRouter)
app.use('/players', playersRouter)


app.listen('3000', () => console.log('Server has started'))
