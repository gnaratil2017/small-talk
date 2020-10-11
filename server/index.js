const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')

const newsItems = require('./routes/news-items')
const app = express()
app.use(express.json())

app.use('/api/news-items', newsItems)

require('dotenv').config()
const port = process.env.PORT || 3000

const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=a1e2ac3cc41a4e309c8ecfda1b379acf'
const localUrl = `http://localhost:${port}/api/news-items`

const clearData = async localUrl => {
  try {
    await axios.delete(localUrl)
  } catch (error) {
    console.log(error)
  }
}

const getData = async (url, localUrl) => {
  try {
    const response = await axios.get(url)
    const data = response.data
    for(let i = 0; i < data.articles.length; i++) {
      setData(data.articles[i], localUrl)
    }
  } catch (error) {
    console.log(error)
  }
}

const setData = async (item, localUrl) => {
  try {
    await axios.post(localUrl, {
      source: item.source.name,
      title: item.title,
      description: item.description,
      url: item.url,
      imageUrl: item.urlToImage,
      publishedAt: item.publishedAt,
      content: item.content,
    })
  } catch (error) {
    console.log(error)
  }
}

mongoose.connect('mongodb+srv://user_0:L3CFaKdfbDwzwEbC@cluster0.twlp2.mongodb.net/small-talk?retryWrites=true&w=majority')
  .then(result => {
    app.listen(port, () => console.log(`Server is running on port ${port}`))
    clearData(localUrl)
    getData(url, localUrl)
  })
  .catch(err => console.log(err))
