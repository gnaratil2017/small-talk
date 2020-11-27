const mongoose = require('mongoose')

const TwitterItemSchema = new mongoose.Schema({
  title: {type: String, required: true},
  url: {type: String, unique: true},
  tweetVolume: Number,
  tags: [String]
}, { timestamps: true })

module.exports = mongoose.model('TwitterItem', TwitterItemSchema)
