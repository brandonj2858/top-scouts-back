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


router.patch('/:id', getPlayer,async (req, res) => {
  let newRank = parseInt(req.body.rank)
  let newReport = req.body.scouting_report
  res.player.rank = newRank
  res.player.scouting_report = newReport
  console.log(res.player)
  try {
    const updatedPlayer = await res.player.save()
    console.log(updatedPlayer)
    res.json(updatedPlayer)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})





async function getPlayer(req, res, next) {
  let player
  try {
    player = await Player.findById(req.params.id);
    if (player == null) {
      return res.status(404).json({ message: 'Player Not Found' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.player = player
  next()
}





module.exports = router
