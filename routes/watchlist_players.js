const express = require('express');
const router = express.Router();
const WatchlistPlayer = require('../models/watchlist_player');

router.get('/', (req, res) => {
  let watchlist_players = WatchlistPlayer.find()
  res.json(watchlist_players)
})

router.post('/', async(req, res) => {
  let watchlist_player = await new WatchlistPlayer({
    name: req.body.name,
    watchlist: req.body.watchlist,
    player: req.body.player
  })
  try {
    await watchlist_player.save()


  } catch (err) {

  }
})

module.exports = router
