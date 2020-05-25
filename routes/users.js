const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {

})

router.patch('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router
