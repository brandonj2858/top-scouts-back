const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('Team', teamSchema)
