const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: {

  }
})



module.exports = mongoose.model('Comments', commentSchema)
