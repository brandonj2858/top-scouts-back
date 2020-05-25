

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('DATABASE_URL=mongodb://localhost/prospects',  {useNewUrlParser: true, useUnifiedTopology: true} )
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))


app.listen('3000', () => console.log('Server has started'))
