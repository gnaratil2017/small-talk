import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'
import NewsCard from '../components/NewsCard'

export interface NewsCardProps {
  item: NewsItem,
  flatListRef: React.LegacyRef<FlatList<NewsItem>>
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
  component: FunctionComponent<NewsCardProps>
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

export function newsItemFromJson(json: NewsItemAttributes) : NewsItem {
  return {
    ...json,
    id: json._id,
    component: NewsCard
  }
}
