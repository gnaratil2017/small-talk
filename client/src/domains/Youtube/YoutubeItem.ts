import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'
import YoutubeCard from '../../components/YoutubeCard'
import NewsItem from '../../domains/News/NewsItem'

export interface CardProps {
  item: YoutubeItem | NewsItem,
  flatListRef: React.LegacyRef<FlatList>
  index: number,
}

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
