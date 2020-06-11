const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')

router.get('/', (req, res) => {
  try {
    let comments = Comment.find()
    res.json(comments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
