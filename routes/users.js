const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('comment').exec()

    res.json(users)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.get('/:id', getUser, (req, res) => {
  res.send(res.user)
})

//Post Methods send 201s since they are more specific to you creating something
router.post('/', async(req, res) => {
  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = await new User({
      username: req.body.username,
      password: hashedPassword,
    })
    const newUser = await user.save()
    res.status(201).json(newUser)
  }
  catch(err) {
    res.status(400).json({ message: err.message })
  }

})

router.patch('/:id', getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  }
  catch (err){
    res.status(500).json({ message: err.message })
  }

})

router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: "Deleted User"})
  } catch (err) {
    res.status(500).json( {message: err.message } )
  }
})

async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)





    if (user == null) {
      return res.status(404).json( { message: "User not found." } )
    }
  }
  catch (err){
    return res.status(500).json( { message: err.message } )
  }
  res.user = user

  next()
}


// Login

router.post('/login', async(req, res) => {
  const user = await User.findOne({username: req.body.username})
  if (!user) return res.status(400).send('Username is Wrong');

  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass) return res.status(400).send('Password is Wrong')

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)
  res.json(user)

  res.send("logged in")
  catch (err){
    return res.status(500).json( { message: err.message } )
  }

})

module.exports = router
