const express = require('express')
const router = express.Router()
const Team = require('../models/team')

router.get('/', async (req, res) => {

  try {
    const teams = await Team.find()
    res.json(teams)
  }
  catch (err){
    res.status(500).json({ message: err.message })
  }

})

router.get('/:id', getTeam, (req, res) => {
  res.send(res.team)
})

//Post Methods send 201s since they are more specific to you creating something
router.post('/', async(req, res) => {
  const team = await new Team({
    school: req.body.school
  })
  try {
    const newTeam = await team.save()
    res.status(201).json(newTeam)
  }
  catch(err) {
    res.status(400).json({ message: err.message })
  }

})

async function getTeam(req, res, next) {
  let team
  try {
    team = await Team.findById(req.params.id)
    if (team == null) {
      return res.status(404).json( { message: "Team not found." } )
    }
  }
  catch (err){
    return res.status(500).json( { message: err.message } )
  }
  res.team = team
  next()
}




module.exports = router
