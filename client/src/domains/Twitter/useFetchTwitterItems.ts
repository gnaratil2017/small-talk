import useSWR, { SWRResponse } from 'swr'
import TwitterItem, { TwitterItemAttributes, twitterItemFromJson } from './TwitterItem'

interface FetchTwitterItemsResponse extends SWRResponse<TwitterItemAttributes[], unknown> {
  twitterItems: TwitterItem[]
}

export default function useFetchTwitterItems(tag: string): FetchTwitterItemsResponse {
  const response = useSWR<TwitterItemAttributes[]>(['twitter-items', tag])

  const twitterItems: TwitterItem[] = response.data ? response.data.map(twitterItemFromJson) : []

  return { ...response, twitterItems }
}
