import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'
import NewsCard from '../../components/NewsCard'
import YoutubeItem from '../../domains/Youtube/YoutubeItem'

export interface CardProps {
  item: YoutubeItem | NewsItem,
  flatListRef: React.LegacyRef<FlatList>
  index: number,
}

export interface NewsItemAttributes {
  _id: string
  source: string
  title: string
  description: string
  url: string
  imageUrl: string
  publishedAt: string
  content: string
  tags: string[]
}

export default interface NewsItem {
  component: FunctionComponent<CardProps>
  id: string
  source: string
  title: string
  description: string
  url: string
  imageUrl: string
  publishedAt: string
  content: string
  tags: string[]
}

export function newsItemFromJson(json: NewsItemAttributes): NewsItem {
  return {
    ...json,
    id: json._id,
    component: NewsCard
  }
}
