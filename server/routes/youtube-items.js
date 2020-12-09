const THRESHOLD = 1.5

const express = require('express')

const YoutubeItem = require('../models/YoutubeItem')

const router = express.Router()

router.post('/', (req, res) => {
  const youtubeItem = new YoutubeItem({
    _id: req.body.id,
    source: req.body.source,
    title: req.body.title,
    thumbnailUrl: req.body.thumbnailUrl,
    publishedAt: req.body.publishedAt,
    duration: req.body.duration,
    viewCount: req.body.viewCount,
    likeCount: req.body.likeCount,
    dislikeCount: req.body.dislikeCount,
    commentCount: req.body.commentCount,
    tags: [],
    sumWeights: {},
    numVotes: {}
  })

  youtubeItem.save()
    .then(result => {
      res.send({
        message: 'Youtube item created successfully',
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

  YoutubeItem.find(query)
    .then(youtubeItems => res.send(youtubeItems))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const youtubeItemId = req.params.id
  const {tag, weight} = req.body

  YoutubeItem.findById(youtubeItemId)
    .then(youtubeItem => {
      const currSumWeights = youtubeItem.sumWeights.get(tag)
      const currNumVotes = youtubeItem.numVotes.get(tag)
      const updatedSumWeights = currSumWeights ? currSumWeights + weight : weight
      const updatedNumVotes = currNumVotes ? currNumVotes + 1 : 1
      youtubeItem.sumWeights.set(tag, updatedSumWeights)
      youtubeItem.numVotes.set(tag, updatedNumVotes)
      const updatedAverage = updatedSumWeights/updatedNumVotes
      if (updatedAverage >= THRESHOLD) {
        youtubeItem.tags = [...new Set([...youtubeItem.tags, tag])]
      } else {
        const index = youtubeItem.tags.indexOf(tag)
        if (index > -1) {
          youtubeItem.tags.splice(index, 1)
        }
      }
      return youtubeItem.save()
    })
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

router.delete('/', (req, res) => {
  YoutubeItem.deleteMany({})
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

module.exports = router
