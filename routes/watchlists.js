const express = require('express')
const router = express.Router()
const Watchlist = require('../models/watchlist')

router.get('/', (req, res) => {
  try {
    let watchlists = Watchlist.find()
    res.json(watchlists)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



module.exports = router
