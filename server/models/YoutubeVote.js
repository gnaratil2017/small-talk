const mongoose = require('mongoose')

const YoutubeVoteSchema = new mongoose.Schema({
  voter: {type: mongoose.Schema.Types.String, ref: 'User'},
  item: {type: mongoose.Schema.Types.String, ref: 'YoutubeItem'},
  tag: String,
  weight: Number
})

module.exports = mongoose.model('YoutubeVote', YoutubeVoteSchema)
