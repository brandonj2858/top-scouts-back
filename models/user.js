const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 6,
    index: {unique: true}
  },
  password: {
    type: String,
    required: true
  },
  scout: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: ""
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'Comment'
    }
  ],
  watchlists: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Watchlist'
      }
    ]
},
{
  toJSON: {
    virtuals: true,
  },
}

)


module.exports = mongoose.model('User', userSchema)
