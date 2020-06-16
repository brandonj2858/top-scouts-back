const mongoose = require('mongoose');

const watchlistPlayerSchema = new mongoose.Schema({
  name: {

  },
  watchlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Watchlist'
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }
})

module.exports = mongoose.model('WatchlistPlayer', watchlistPlayerSchema)
