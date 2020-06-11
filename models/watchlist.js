const mongoose = require('mongoose')


const watchlistSchema = new mongoose.Schema({
  name: {
    type: String
  }
})


module.exports = mongoose.model('Watchlist', watchlistSchema)
