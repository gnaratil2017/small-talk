const express = require('express')

const YoutubeVote = require('../models/YoutubeVote')

const router = express.Router()

router.post('/', (req, res) => {
  const youtubeVote = new YoutubeVote({
    voter: req.body.voter,
    item: req.body.item,
    tag: req.body.tag,
    weight: req.body.weight
  })

  youtubeVote.save()
    .then(result => {
      res.send({
        message: 'Youtube vote created successfully',
        data: result
      })
    })
    .catch(err => console.log(err))
})

router.get('/', (req, res) => {
  YoutubeVote.find(req.query)
    .then(youtubeVotes => res.send(youtubeVotes))
    .catch(err => console.log(err))
})

router.delete('/', (req, res) => {
  YoutubeVote.deleteMany({})
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

module.exports = router
