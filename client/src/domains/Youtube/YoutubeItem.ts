import { FunctionComponent } from 'react'
import YoutubeCard from '../../components/YoutubeCard'
import { CardProps } from '../../screens/ListScreen'

export interface YoutubeItemAttributes {
  _id: string
  source: string
  title: string
  thumbnailUrl: string
  publishedAt: string
  duration: string
  viewCount: string
  likeCount: string
  dislikeCount: string
  commentCount: string
}

export default interface YoutubeItem {
  component: FunctionComponent<CardProps>
  id: string
  source: string
  title: string
  thumbnailUrl: string
  publishedAt: string
  duration: string
  viewCount: string
  likeCount: string
  dislikeCount: string
  commentCount: string
}

export function youtubeItemFromJson(json: YoutubeItemAttributes): YoutubeItem {
  return {
    ...json,
    id: json._id,
    component: YoutubeCard
  }
}
