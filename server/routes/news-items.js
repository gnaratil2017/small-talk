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
  NewsItem.find()
    .then(newsItems => res.send(newsItems))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  const newsItemId = req.params.id

  NewsItem.findById(newsItemId)
    .then(newsItem => res.send(newsItem))
    .catch(err => console.log(err))
})

module.exports = router
