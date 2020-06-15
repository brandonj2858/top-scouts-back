const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')
const User = require('../models/user')
const Player = require('../models/player')

router.get('/', async(req, res) => {
  try {
    let comments = await Comment.find()
    console.log(comments)
    res.json(comments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async(req, res) => {
  console.log(req.body)
  const comment = await new Comment({
    content: req.body.content,
    user: req.body.user,
    player: req.body.player
  })
/*  const user = await User.findById(req.body.user) */


  try {
    const newComment = await comment.save()
    await User.update(
      {_id: req.body.user},
      {$push: {comments: comment}}
    )
    await Player.update(
      {_id: req.body.player},
      {$push: {comments: comment}}
    )
    res.status(201).json(newComment)
  }
  catch(err) {
    res.status(400).json({ message: err.message })
  }

})

module.exports = router
