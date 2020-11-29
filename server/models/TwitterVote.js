const mongoose = require('mongoose')

const TwitterVoteSchema = new mongoose.Schema({
  voter: {type: mongoose.Schema.Types.String, ref: 'User'},
  item: {type: mongoose.Schema.Types.ObjectId, ref: 'TwitterItem'},
  tag: String,
  weight: Number
})

module.exports = mongoose.model('TwitterVote', TwitterVoteSchema)
