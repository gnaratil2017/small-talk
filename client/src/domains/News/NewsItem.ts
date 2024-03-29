import { FunctionComponent } from 'react'
import NewsCard from '../../components/NewsCard'
import { CardProps } from '../../screens/ListScreen'

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
    component: NewsCard,
  }
}
