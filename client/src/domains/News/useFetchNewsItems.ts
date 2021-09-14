import useSWR, { SWRResponse } from 'swr'
import NewsItem, { NewsItemAttributes, newsItemFromJson } from '../../stores/NewsItem'

interface FetchNewsItemsResponse extends SWRResponse<NewsItemAttributes[], unknown> {
  newsItems: NewsItem[]
}

export default function useFetchNewsItems(tag: string): FetchNewsItemsResponse {
  const response = useSWR<NewsItemAttributes[]>(['news-items', tag])

  const newsItems: NewsItem[] = response.data ? response.data.map(newsItemFromJson) : []

  return { ...response, newsItems }
}
