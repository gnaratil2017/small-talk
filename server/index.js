require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')
const newsItems = require('./routes/news-items')
const youtubeItems = require('./routes/youtube-items')

const app = express()
app.use(express.json())
app.use('/api/news-items', newsItems)
app.use('/api/youtube-items', youtubeItems)

const port = process.env.PORT || 3000

const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_KEY}`
const youtubeUrl= `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${process.env.YOUTUBE_KEY}`
const localNewsUrl = `http://localhost:${port}/api/news-items`
const localYoutubeUrl = `http://localhost:${port}/api/youtube-items`

const clearData = async localUrl => {
  try {
    await axios.delete(localUrl)
  } catch (error) {
    console.log(error)
  }
}

const getData = async urls => {
  try {
    const response = await axios.get(urls[0])
    const data = response.data
    setNewsData(data)
  } catch (error) {
    console.log(error)
  }
  try {
    const response = await axios.get(urls[1])
    const data = response.data
    setYoutubeData(data)
  } catch (error) {
    console.log(error)
  }
}

const setNewsData = async data => {
  for(let i = 0; i < data.articles.length; i++) {
    let item = data.articles[i]
    try {
      await axios.post(localNewsUrl, {
        source: item.source.name,
        title: item.title.lastIndexOf(' - ') === -1 ? item.title : item.title.slice(0, item.title.lastIndexOf(' - ')),
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
}

const setYoutubeData = async data => {
  for(let i = 0; i < data.items.length; i++) {
    let item = data.items[i]
    try {
      await axios.post(localYoutubeUrl, {
        source: item.snippet.channelTitle,
        title: item.snippet.title,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        publishedAt: item.snippet.publishedAt,
        duration: item.contentDetails.duration,
        viewCount: item.statistics.viewCount,
        likeCount: item.statistics.likeCount,
        dislikeCount: item.statistics.dislikeCount,
        commentCount: item.statistics.commentCount
      })
    } catch (error) {
      console.log(error)
    }
  }
}

mongoose.connect('mongodb+srv://user_0:L3CFaKdfbDwzwEbC@cluster0.twlp2.mongodb.net/small-talk?retryWrites=true&w=majority')
  .then(result => {
    app.listen(port, () => console.log(`Server is running on port ${port}`))
    clearData(localNewsUrl)
    clearData(localYoutubeUrl)
    getData([newsUrl, youtubeUrl])
  })
  .catch(err => console.log(err))
