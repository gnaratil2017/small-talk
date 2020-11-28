const mongoose = require('mongoose')

const NewsVoteSchema = new mongoose.Schema({
  voter: {type: mongoose.Schema.Types.String, ref: 'User'},
  item: {type: mongoose.Schema.Types.ObjectId, ref: 'NewsItem'},
  tag: String,
  weight: Number
})

module.exports = mongoose.model('NewsVote', NewsVoteSchema)
