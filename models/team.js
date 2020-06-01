const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({

  school: {
    type: String,
    required: true
  },
  mascot: {
    type: String,
  },
  abbreviation: {
    type: String
  },
  alt_name_1: {
    type: String
  },
  alt_name_2: {
    type: String
  },
  alt_name_3: {
    type: String
  },
  conference: {
    type: String
  },
  division: {
    type: String
  },
  color: {
    type: String
  },
  alt_color: {
    type: String
  },
  logos: [{
    type: String
  }]
})

module.exports = mongoose.model('Team', teamSchema)
