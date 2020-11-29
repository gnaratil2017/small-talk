const THRESHOLD = 2

const express = require('express')

const NewsItem = require('../models/NewsItem')

const router = express.Router()

router.post('/', (req, res) => {
  const newsItem = new NewsItem({
    source: req.body.source,
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    imageUrl: req.body.imageUrl,
    publishedAt: req.body.publishedAt,
    content: req.body.content,
    tags: []
  })

  newsItem.save()
    .then(result => {
      res.send({
        message: 'News item created successfully',
        data: result
      })
    })
    .catch(err => console.log(err))
})

router.get('/', (req, res) => {
  const {tag, date} = req.query
  query = {}

  if (tag) {
    query['tags'] = {$in: tag}
  }
  if (date) {
    query['createdAt'] = {$gte: date}
  }

  NewsItem.find(query)
    .then(newsItems => res.send(newsItems))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  const newsItemId = req.params.id

  NewsItem.findById(newsItemId)
    .then(newsItem => res.send(newsItem))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const newsItemId = req.params.id
  const {tag, weight} = req.body

  NewsItem.findById(newsItemId)
    .then(newsItem => {
      const currentVotes = newsItem.votes.get(tag)
      if (!currentVotes || currentVotes < THRESHOLD) {
        const updatedVotes = currentVotes ? currentVotes + weight : weight
        newsItem.votes.set(tag, updatedVotes)
        if (updatedVotes >= THRESHOLD) {
          newsItem.tags = [...new Set([...newsItem.tags, tag])]
        }
      }
      return newsItem.save()
    })
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

router.delete('/', (req, res) => {
  NewsItem.deleteMany({})
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

module.exports = router
