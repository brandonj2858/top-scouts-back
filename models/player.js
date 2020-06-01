const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  first_name: {

  },
  last_name: {

  },
  height: {

  },
  weight: {

  },
  jersey: {

  },
  year: {

  },
  position: {

  },
  city: {

  },
  state: {

  },
  country: {

  },
  school: {

  },
})



module.exports = mongoose.model('Player', playerSchema)
