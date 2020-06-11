const mongoose = require('mongoose');

const watchlistPlayerSchema = new mongoose.Schema({
  name: {

  }
})

module.exports = mongoose.model('WatchlistPlayer', watchlistPlayerSchema)
