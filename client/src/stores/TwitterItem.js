import {extendObservable} from 'mobx'
import TwitterCard from '../components/TwitterCard'

export default class TwitterItem {
  constructor(item) {
    const {_id, title, url, tweetVolume} = item

    extendObservable(this, {
      component: TwitterCard,
      id: _id,
      title,
      url,
      tweetVolume,
      imageUrl:
        'https://9to5google.com/wp-content/uploads/sites/4/2016/10/twitter-logo-high-e1477757975960.jpg?quality=82&strip=all&w=1600',
    })
  }
}
