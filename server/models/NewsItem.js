const mongoose = require('mongoose')

const NewsItemSchema = new mongoose.Schema({
  source: String,
  title: {type: String, required: true},
  description: String,
  url: {type: String, unique: true},
  imageUrl: String,
  publishedAt: String,
  content: String,
  tags: [String],
  sumWeights: {type: Map, of: Number},
  numVotes: {type: Map, of: Number}
}, { timestamps: true })

module.exports = mongoose.model('NewsItem', NewsItemSchema)
