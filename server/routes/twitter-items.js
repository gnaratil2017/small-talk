const express = require('express')

const TwitterItem = require('../models/TwitterItem')

const router = express.Router()

router.post('/', (req, res) => {
  const twitterItem = new TwitterItem({
    name: req.body.name,
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
  TwitterItem.find()
    .then(twitterItems => res.send(twitterItems))
    .catch(err => console.log(err))
})

router.delete('/', (req, res) => {
  TwitterItem.deleteMany({})
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

module.exports = router
