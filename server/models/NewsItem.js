const mongoose = require('mongoose')

const NewsItemSchema = new mongoose.Schema({
  source: String,
  title: {type: String, required: true},
  description: String,
  url: String,
  imageUrl: String,
  publishedAt: String,
  content: String,
  tags: [String]
})

module.exports = mongoose.model('NewsItem', NewsItemSchema)
