const mongoose = require('mongoose')

const YoutubeItemSchema = new mongoose.Schema({
  _id: String,
  source: String,
  title: {type: String, required: true},
  thumbnailUrl: String,
  publishedAt: String,
  duration: String,
  viewCount: Number,
  likeCount: Number,
  dislikeCount: Number,
  commentCount: Number,
  tags: [String]
}, { timestamps: true })

module.exports = mongoose.model('YoutubeItem', YoutubeItemSchema)
