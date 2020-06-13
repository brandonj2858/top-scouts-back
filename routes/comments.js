const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')

router.get('/', async(req, res) => {
  try {
    let comments = await Comment.find()
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

  try {
    const newComment = await comment.save()
    res.status(201).json(newComment)
  }
  catch(err) {
    res.status(400).json({ message: err.message })
  }

})

module.exports = router
