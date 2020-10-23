const mongoose = require('mongoose')

const YoutubeItemSchema = new mongoose.Schema({
  source: String,
  title: {type: String, required: true},
  thumbnailUrl: String,
  publishedAt: String,
  duration: String,
  viewCount: Number,
  likeCount: Number,
  dislikeCount: Number,
  commentCount: Number
})

module.exports = mongoose.model('YoutubeItem', YoutubeItemSchema)
