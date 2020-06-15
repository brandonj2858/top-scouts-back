const mongoose = require('mongoose');

const watchlistPlayerSchema = new mongoose.Schema({
  name: {

  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'player'
  }
})

module.exports = mongoose.model('WatchlistPlayer', watchlistPlayerSchema)
