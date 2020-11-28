const express = require('express')

const User = require('../models/User')

const router = express.Router()

router.post('/', (req, res) => {
  const user = new User({
    _id: req.body.id
  })

  user.save()
    .then(result => {
      res.send({
        message: 'User created successfully',
        data: result
      })
    })
    .catch(err => console.log(err))
})

router.get('/', (req, res) => {
  User.find()
    .then(users => res.send(users))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  const userId = req.params.id

  User.findById(userId, (err, user) => {
    if (err) {
      console.log(err)
    } else if (!user) {
      res.status(404).send()
    } else {
      res.send(user)
    }
  })
})

module.exports = router
