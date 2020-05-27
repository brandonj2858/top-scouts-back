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

//Post Methods send 201s since they are more specific to you creating something
router.post('/', async(req, res) => {
  const user = await new User({
    username: req.body.username,
    password: req.body.password,
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  }
  catch(err) {
    res.status(400).json({ message: err.message })
  }

})

router.patch('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router
