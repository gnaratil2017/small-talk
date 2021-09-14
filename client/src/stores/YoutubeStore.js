import {makeAutoObservable, runInAction} from 'mobx'
import axios from 'axios'
import moment from 'moment'
import YoutubeItem from './YoutubeItem'
import getEnvVars from '../../environment'
const {apiUrl} = getEnvVars()

class YoutubeStore {
  youtubeItems = new Map();
  loading = true;

  constructor() {
    makeAutoObservable(this)
  }

  async fetchFilteredYoutubeItems(tag) {
    this.loading = true
    try {
      const response = await axios.get(`${apiUrl}/youtube-items`, {
        params:
          tag === 'hot'
            ? {date: moment().subtract(1, 'days').toDate()}
            : {tag: tag},
      })
      const data = response.data.map((item) => new YoutubeItem(item))
      runInAction(() => {
        this.youtubeItems.set(tag, data)
      })
    } catch (e) {
      console.log(e)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }
}

export default new YoutubeStore()
