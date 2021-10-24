import { FunctionComponent } from 'react'
import TwitterCard from '../../components/TwitterCard'
import { CardProps } from '../../screens/ListScreen'

export interface TwitterItemAttributes {
  _id: string
  title: string,
  url: string,
  tweetVolume: string,
}

export default interface TwitterItem {
  component: FunctionComponent<CardProps>
  id: string
  title: string,
  url: string,
  tweetVolume: string,
  imageUrl: string,
}

export function twitterItemFromJson(json: TwitterItemAttributes): TwitterItem {
  return {
    ...json,
    id: json._id,
    component: TwitterCard,
    imageUrl: 'https://9to5google.com/wp-content/uploads/sites/4/2016/10/twitter-logo-high-e1477757975960.jpg?quality=82&strip=all&w=1600',
  }
}
