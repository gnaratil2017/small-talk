const express = require('express')

const YoutubeItem = require('../models/YoutubeItem')

const router = express.Router()

router.post('/', (req, res) => {
  const youtubeItem = new YoutubeItem({
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
  YoutubeItem.find()
    .then(youtubeItems => res.send(youtubeItems))
    .catch(err => console.log(err))
})

router.delete('/', (req, res) => {
  YoutubeItem.deleteMany({})
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

module.exports = router
