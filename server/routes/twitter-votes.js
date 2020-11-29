const express = require('express')

const TwitterVote = require('../models/TwitterVote')

const router = express.Router()

router.post('/', (req, res) => {
  const twitterVote = new TwitterVote({
    voter: req.body.voter,
    item: req.body.item,
    tag: req.body.tag,
    weight: req.body.weight
  })

  twitterVote.save()
    .then(result => {
      res.send({
        message: 'Twitter vote created successfully',
        data: result
      })
    })
    .catch(err => console.log(err))
})

router.get('/', (req, res) => {
  TwitterVote.find(req.query)
    .then(twitterVotes => res.send(twitterVotes))
    .catch(err => console.log(err))
})

router.delete('/', (req, res) => {
  TwitterVote.deleteMany({})
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

module.exports = router
