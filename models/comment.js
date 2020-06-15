const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: {

  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }
})



module.exports = mongoose.model('Comment', commentSchema)
