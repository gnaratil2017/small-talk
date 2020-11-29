const THRESHOLD = 2

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
    commentCount: req.body.commentCount
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

router.get('/:date', (req, res) => {
  const date = req.params.date

  YoutubeItem.find({createdAt: {$gte: date}})
    .then(youtubeItems => res.send(youtubeItems))
    .catch(err => console.log(err))
})

router.get('/:tag', (req, res) => {
  const tag = req.params.tag

  YoutubeItem.find({tags: {$in: tag}})
    .then(youtubeItems => res.send(youtubeItems))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const youtubeItemId = req.params.id
  const {tag, weight} = req.body

  YoutubeItem.findById(youtubeItemId)
    .then(youtubeItem => {
      const currentVotes = youtubeItem.votes.get(tag)
      if (!currentVotes || currentVotes < THRESHOLD) {
        const updatedVotes = currentVotes ? currentVotes + weight : weight
        youtubeItem.votes.set(tag, updatedVotes)
        if (updatedVotes >= THRESHOLD) {
          youtubeItem.tags = [...new Set([...youtubeItem.tags, tag])]
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
