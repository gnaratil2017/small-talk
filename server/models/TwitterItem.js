const mongoose = require('mongoose')

const TwitterItemSchema = new mongoose.Schema({
  name: {type: String, required: true},
  url: String,
  tweetVolume: Number

})

module.exports = mongoose.model('TwitterItem', TwitterItemSchema)
