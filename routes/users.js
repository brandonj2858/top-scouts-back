const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

require('dotenv').config();


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
    console.log()

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

  try {
    const {username, password} = req.body;
    const user = await User.findOne({username: req.body.username})
    console.log(user)
    if (!user) return res.status(400).json({message: 'Username is Wrong'});
    const validPass = await bcrypt.compare(password, user.password)
    if(!validPass) return res.status(400).json({message:'Password is Wrong'})
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
      }
    })
  }
  catch(err) {
    return res.status(404).json( { message: err.message } )
  }

  router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




})

module.exports = router
