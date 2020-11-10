import {makeAutoObservable, runInAction} from 'mobx';
import axios from 'axios';
import moment from 'moment';
import YoutubeItem from './YoutubeItem';

class YoutubeStore {
  youtubeItems = new Map();
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchFilteredYoutubeItems(tag) {
    this.loading = true;
    try {
      const response = await axios.get(
        'http://localhost:3000/api/youtube-items',
        {
          params:
            tag === 'hot'
              ? {date: moment().subtract(1, 'days').toDate()}
              : {tag: tag},
        },
      );
      const data = response.data.map((item) => new YoutubeItem(item));
      runInAction(() => {
        this.youtubeItems.set(tag, data);
      });
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export default new YoutubeStore();
