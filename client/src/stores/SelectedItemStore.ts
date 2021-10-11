import {makeAutoObservable, action, runInAction} from 'mobx'
import axios from 'axios'
import UserStore from './UserStore'
import getEnvVars from '../../environment'
import { ContentItem } from '../screens/ListScreen'
const {apiUrl} = getEnvVars()

interface Vote {
  voter: string
  item: string
  tag: string
  weight: number
}

interface FetchVoteResponse {
  data: Vote[]
}

class SelectedItemStore {
  selectedItem: ContentItem | undefined = undefined;
  itemType = '';
  hasNotVoted: Record<string, boolean> = {};

  constructor() {
    makeAutoObservable(this)
  }

  setSelectedItem = action((item: ContentItem, itemType: string) => {
    this.selectedItem = item
    this.itemType = itemType
  })

  async getVote(tag: string) {
    try {
      const response: FetchVoteResponse = await axios.get(`${apiUrl}/${this.itemType}-votes`, {
        params: {
          voter: UserStore.id,
          item: this.selectedItem?.id,
          tag: tag,
        },
      })

      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  async checkHasNotVoted(tag: string) {
    try {
      const data = await this.getVote(tag)
      runInAction(() => {
        this.hasNotVoted[tag] = data?.length === 0
      })
    } catch (e) {
      console.log(e)
    }
  }

  sendVoteIfHasNotVoted(tag: string, weight: number) {
    if (this.hasNotVoted[tag]) {
      void this.createVote(tag, weight)
      void this.addVoteToItem(tag, weight)
    }
  }

  async createVote(tag: string, weight: number) {
    try {
      await axios.post(`${apiUrl}/${this.itemType}-votes`, {
        voter: UserStore.id,
        item: this.selectedItem?.id,
        tag: tag,
        weight: weight,
      })
      runInAction(() => {
        this.hasNotVoted[tag] = false
      })
    } catch (e) {
      console.log(e)
    }
  }

  async addVoteToItem(tag: string, weight: number) {
    try {
      await axios.put(
        `${apiUrl}/${this.itemType}-items/${this.selectedItem?.id ?? ''}`,
        {
          tag: tag,
          weight: weight,
        },
      )
    } catch (e) {
      console.log(e)
    }
  }
}

export default new SelectedItemStore()
