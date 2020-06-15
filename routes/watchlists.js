const express = require('express')
const router = express.Router()
const Watchlist = require('../models/watchlist')
const User = require('../models/user')

router.get('/', (req, res) => {
  try {
    let watchlists = Watchlist.find()
    res.json(watchlists)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async(req, res) => {
  const watchlist = await new Watchlist({
    name: req.body.name,
    watchlist_players: [],
    user: req.body.user
  })

  try {
    const newWatchlist = await watchlist.save()
    await User.update(
      {_id: req.body.user},
      {$push: {watchlists: watchlist}}
    )
    res.status(201).json(newWatchlist)
  }
  catch(err) {
    res.status(400).json({ message: err.message })
  }

})

router.patch('/:id', getWatchlists, (req, res) => {

})





async function getWatchlists(req, res, next) {
  let watchlist
  try {
    watchlist = await Watchlist.findById(req.params.id)

    if (watchlist == null) {
      return res.status(404).json( { message: "Watchlist Not Found" } )
    }

  } catch (err) {
    res.status(500).json( { message: err.message } )
  }
  watchlist = res.watchlist

  next()
}





module.exports = router
