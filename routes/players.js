const express = require('express');
const router = express.Router();
const Player = require('../models/player');

router.get('/', async (req, res) => {
  try {
    const players = await Player.find()
    res.json(players)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.get('/:id', getPlayer, (req, res) => {
  res.send(res.player)

})





async function getPlayer(req, res, next) {
  let player
  try {
    player = await Player.findById(req.params.id);
    if (plauer == null) {
      return res.status(404).json({ message: 'Player Not Found' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.player = player
  next()
}





module.exports = router
