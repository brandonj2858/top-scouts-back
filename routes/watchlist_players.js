const express = require('express');
const router = express.Router();
const WatchlistPlayer = require('../models/watchlist_player');

router.get('/', (req, res) => {
  let watchlist_players = WatchlistPlayer.find()
  res.json(watchlist_players)
})

module.exports = router
