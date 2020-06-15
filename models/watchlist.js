const mongoose = require('mongoose')


const watchlistSchema = new mongoose.Schema({
  name: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  watchlist_players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WatchlistPlayer'
    }
  ]
})


module.exports = mongoose.model('Watchlist', watchlistSchema)
