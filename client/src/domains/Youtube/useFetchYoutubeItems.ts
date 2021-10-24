import useSWR, { SWRResponse } from 'swr'
import YoutubeItem, { YoutubeItemAttributes, youtubeItemFromJson } from './YoutubeItem'

interface FetchYoutubeItemsResponse extends SWRResponse<YoutubeItemAttributes[], unknown> {
  youtubeItems: YoutubeItem[]
}

export default function useFetchNewsItems(tag: string): FetchYoutubeItemsResponse {
  const response = useSWR<YoutubeItemAttributes[]>(['youtube-items', tag])

  const youtubeItems: YoutubeItem[] = response.data ? response.data.map(youtubeItemFromJson) : []

  return { ...response, youtubeItems }
}
