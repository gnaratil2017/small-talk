const express = require('express')

const NewsVote = require('../models/NewsVote')

const router = express.Router()

router.post('/', (req, res) => {
  const newsVote = new NewsVote({
    voter: req.body.voter,
    item: req.body.item,
    tag: req.body.tag,
    weight: req.body.weight
  })

  newsVote.save()
    .then(result => {
      res.send({
        message: 'News vote created successfully',
        data: result
      })
    })
    .catch(err => console.log(err))
})

router.get('/', (req, res) => {
  NewsVote.find(req.query)
    .then(newsVotes => res.send(newsVotes))
    .catch(err => console.log(err))
})

router.delete('/', (req, res) => {
  NewsVote.deleteMany({})
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

module.exports = router
