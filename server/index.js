const express = require('express')
const mongoose = require('mongoose')

const newsItems = require('./routes/news-items')
const app = express()
app.use(express.json())

app.use('/api/news-items', newsItems)

require('dotenv').config()
const port = process.env.PORT || 3000

mongoose.connect('mongodb+srv://user_0:L3CFaKdfbDwzwEbC@cluster0.twlp2.mongodb.net/small-talk?retryWrites=true&w=majority')
  .then(result => {
    app.listen(port, () => console.log(`Server is running on port ${port}`))
  })
  .catch(err => console.log(err))
