const THRESHOLD = 2

const express = require('express')

const TwitterItem = require('../models/TwitterItem')

const router = express.Router()

router.post('/', (req, res) => {
  const twitterItem = new TwitterItem({
    title: req.body.name,
    url: req.body.url,
    tweetVolume: req.body.tweetVolume
  })

  twitterItem.save()
    .then(result => {
      res.send({
        message: 'Twitter item created successfully',
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

  TwitterItem.find(query)
    .then(twitterItems => res.send(twitterItems))
    .catch(err => console.log(err))
})

router.get('/:date', (req, res) => {
  const date = req.params.date

  TwitterItem.find({createdAt: {$gte: date}})
    .then(twitterItems => res.send(twitterItems))
    .catch(err => console.log(err))
})

router.get('/:tag', (req, res) => {
  const tag = req.params.tag

  TwitterItem.find({tags: {$in: tag}})
    .then(twitterItems => res.send(twitterItems))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const twitterItemId = req.params.id
  const {tag, weight} = req.body

  TwitterItem.findById(twitterItemId)
    .then(twitterItem => {
      const currentVotes = twitterItem.votes.get(tag)
      if (!currentVotes || currentVotes < THRESHOLD) {
        const updatedVotes = currentVotes ? currentVotes + weight : weight
        twitterItem.votes.set(tag, updatedVotes)
        if (updatedVotes >= THRESHOLD) {
          twitterItem.tags = [...new Set([...twitterItem.tags, tag])]
        }
      }
      return twitterItem.save()
    })
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

router.delete('/', (req, res) => {
  TwitterItem.deleteMany({})
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

module.exports = router
