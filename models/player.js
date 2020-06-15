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
  rank: {

  },
  scouting_report: {

  },
  comments: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
    }
  ]
},{
  toJSON: {
    virtuals: true,
  },
})



module.exports = mongoose.model('Player', playerSchema)
