require('dotenv').config()
const Team = require('./models/team')
const Watchlist = require('./models/watchlist')

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


let schoolsList = [  'Air Force',         'Akron',                 'Alabama',
  'Appalachian State', 'Arizona',               'Arizona State',
  'Arkansas',          'Arkansas State',        'Army',
  'Auburn',            'Ball State',            'Baylor',
  'Boise State',       'Boston College',        'Bowling Green',
  'Buffalo',           'BYU',                   'California',
  'Central Michigan',  'Charlotte',             'Cincinnati',
  'Clemson',           'Coastal Carolina',      'Colorado',
  'Colorado State',    'Connecticut',           'Duke',
  'East Carolina',     'Eastern Michigan',      'Florida',
  'Florida Atlantic',  'Florida International', 'Florida State',
  'Fresno State',      'Georgia',               'Georgia Southern',
  'Georgia State',     'Georgia Tech',          "Hawai'i",
  'Houston',           'Illinois',              'Indiana',
  'Iowa',              'Iowa State',            'Kansas',
  'Kansas State',      'Kent State',            'Kentucky',
  'Liberty',           'Louisiana',             'Louisiana Monroe',
  'Louisiana Tech',    'Louisville',            'LSU',
  'Marshall',          'Maryland',              'Memphis',
  'Miami',             'Miami (OH)',            'Michigan',
  'Michigan State',    'Middle Tennessee',      'Minnesota',
  'Mississippi State', 'Missouri',              'Navy',
  'NC State',          'Nebraska',              'Nevada',
  'New Mexico',        'New Mexico State',      'North Carolina',
  'Northern Illinois', 'North Texas',           'Northwestern',
  'Notre Dame',        'Ohio',                  'Ohio State',
  'Oklahoma',          'Oklahoma State',        'Old Dominion',
  'Ole Miss',          'Oregon',                'Oregon State',
  'Penn State',        'Pittsburgh',            'Purdue',
  'Rice',              'Rutgers',               'San Diego State',
  'San José State',    'SMU',                   'South Alabama',
  'South Carolina',    'Southern Mississippi',  'South Florida',
  'Stanford',          'Syracuse',              'TCU',
  'Temple',            'Tennessee',             'Texas',
  'Texas A&M',         'Texas State',           'Texas Tech',
  'Toledo',            'Troy',                  'Tulane',
  'Tulsa',             'UAB',                   'UCF',
  'UCLA',              'UMass',                 'UNLV',
  'USC',               'Utah',                  'Utah State',
  'UTEP',              'UT San Antonio',        'Vanderbilt',
  'Virginia',          'Virginia Tech',         'Wake Forest',
  'Washington',        'Washington State',      'Western Kentucky',
  'Western Michigan',  'West Virginia',         'Wisconsin',
  'Wyoming'
]

let schoolsTest = ['Appalachian State', 'Arizona']





/*
function rosterFetch() {
  schoolsList.forEach((school) => {
    fetch(`https://api.collegefootballdata.com/roster?team=${school}&year=2019`)
      .then(res => res.json())
      .then(resObj => {
        resObj.forEach((player) => player.school = school)
        return resObj
       })
      .then(resObj => db.collection('players').insertMany(resObj))
  })
}

rosterFetch()

*/







/*
fetch('https://api.collegefootballdata.com/roster?team=Washington%20State&year=2019')
  .then(res => res.json())
  .then(resObj => {
    resObj.forEach(player => player.school = "Washington State")
    return resObj
  })
  .then(resObj => db.collection('players').insertMany(resObj))
*/






//Middleware that Allows server to accept JSON as body.
app.use(express.json())

const teamsRouter = require('./routes/teams')
const usersRouter = require('./routes/users')
const playersRouter = require('./routes/players')
const watchlistsRouter = require('./routes/watchlists')
const commentsRouter = require('./routes/comments')
const watchlistPlayersRouter = require('./routes/watchlist_players')

app.use('/watchlist_players', watchlistPlayersRouter)
app.use('/comments', commentsRouter)
app.use('/watchlists', watchlistsRouter)
app.use('/users', usersRouter)
app.use('/teams', teamsRouter)
app.use('/players', playersRouter)


app.listen('3000', () => console.log('Server has started'))
