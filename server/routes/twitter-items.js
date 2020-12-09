const THRESHOLD = 1.5

const express = require('express')

const TwitterItem = require('../models/TwitterItem')

const router = express.Router()

router.post('/', (req, res) => {
  const twitterItem = new TwitterItem({
    title: req.body.name,
    url: req.body.url,
    tweetVolume: req.body.tweetVolume,
    tags: [],
    sumWeights: {},
    numVotes: {}
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

router.put('/:id', (req, res) => {
  const twitterItemId = req.params.id
  const {tag, weight} = req.body

  TwitterItem.findById(twitterItemId)
    .then(twitterItem => {
      const currSumWeights = twitterItem.sumWeights.get(tag)
      const currNumVotes = twitterItem.numVotes.get(tag)
      const updatedSumWeights = currSumWeights ? currSumWeights + weight : weight
      const updatedNumVotes = currNumVotes ? currNumVotes + 1 : 1
      twitterItem.sumWeights.set(tag, updatedSumWeights)
      twitterItem.numVotes.set(tag, updatedNumVotes)
      const updatedAverage = updatedSumWeights/updatedNumVotes
      if (updatedAverage >= THRESHOLD) {
        twitterItem.tags = [...new Set([...twitterItem.tags, tag])]
      } else {
        const index = twitterItem.tags.indexOf(tag)
        if (index > -1) {
          twitterItem.tags.splice(index, 1)
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
