require('dotenv').config()
// const mongoose = require('mongoose')
const axios = require('axios')
const moment = require('moment')
const Twitter = require('twitter')
const NewsItem = require('./models/NewsItem')
const YoutubeItem = require('./models/YoutubeItem')
const TwitterItem = require('./models/TwitterItem')

// const mongoUri = process.env.MONGODB_URI

const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_KEY}`
const youtubeUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${process.env.YOUTUBE_KEY}&maxResults=10`

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const saveNewsData = async data => {
  for(let i = 0; i < data.articles.length; i++) {
    const item = data.articles[i]
    const newsItem = new NewsItem({
      source: item.source.name,
      title: item.title.lastIndexOf(' - ') === -1 ? item.title : item.title.slice(0, item.title.lastIndexOf(' - ')),
      description: item.description,
      url: item.url,
      imageUrl: item.urlToImage,
      publishedAt: item.publishedAt,
      content: item.content,
      tags: [],
      sumWeights: {},
      numVotes: {}
    })

    await newsItem.save().catch(err => console.log(err))
  }
}

const saveYoutubeData = async data => {
  for(let i = 0; i < data.items.length; i++) {
    const item = data.items[i]
    const youtubeItem = new YoutubeItem({
      _id: item.id,
      source: item.snippet.channelTitle,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
      duration: item.contentDetails.duration,
      viewCount: item.statistics.viewCount,
      likeCount: item.statistics.likeCount,
      dislikeCount: item.statistics.dislikeCount,
      commentCount: item.statistics.commentCount,
      tags: [],
      sumWeights: {},
      numVotes: {}
    })

    await youtubeItem.save().catch(err => console.log(err))
  }
}

const saveTwitterData = async data => {
  for(let i = 0; i < 15; i++) {
    const item = data.trends[i]
    const twitterItem = new TwitterItem({
      title: item.name,
      url: item.url,
      tweetVolume: item.tweet_volume,
      tags: [],
      sumWeights: {},
      numVotes: {}
    })

    await twitterItem.save().catch(err => console.log(err))
  }
}

const urls = {
  [newsUrl]: saveNewsData,
  [youtubeUrl]: saveYoutubeData
}

const deleteNewsDataBeforeDate = (date) => {
  NewsItem.deleteMany({createdAt: {$lte: date}}).catch(err => console.log(err))
}

const deleteYoutubeDataBeforeDate = (date) => {
  YoutubeItem.deleteMany({createdAt: {$lte: date}}).catch(err => console.log(err))
}

const deleteTwitterDataBeforeDate = (date) => {
  TwitterItem.deleteMany({createdAt: {$lte: date}}).catch(err => console.log(err))
}

const deleteDataBeforeDate = (date) => {
  deleteNewsDataBeforeDate(date)
  deleteYoutubeDataBeforeDate(date)
  deleteTwitterDataBeforeDate(date)
}

const getRecentData = async urls => {
  for (const url in urls) {
    try {
      const response = await axios.get(url)
      const data = response.data
      urls[url](data)
    } catch (error) {
      console.log(error)
    }
  }
  twitterClient.get('trends/place', {id: '23424977'}, (error, tweets, response) => {
    if(error) throw error
    const data = JSON.parse(response.body)[0]
    saveTwitterData(data)
  })
}

const updateContent = async () => {
  deleteDataBeforeDate(moment().subtract(6, 'days').toDate())
  await getRecentData(urls)
  // process.exit()
}

updateContent()

// mongoose.connect(mongoUri,
//   {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
//   .then(result => {
//     updateContent()
//   })
//   .catch(err => console.log(err))
