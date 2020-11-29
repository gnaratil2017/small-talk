const mongoose = require('mongoose')

const TwitterItemSchema = new mongoose.Schema({
  title: {type: String, required: true},
  url: {type: String, unique: true},
  tweetVolume: Number,
  tags: [String],
  votes: {type: Map, of: Number}
}, { timestamps: true })

module.exports = mongoose.model('TwitterItem', TwitterItemSchema)
