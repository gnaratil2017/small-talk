import {makeAutoObservable, runInAction} from 'mobx';
import axios from 'axios';
import moment from 'moment';
import TwitterItem from './TwitterItem';

class TwitterStore {
  twitterItems = new Map();
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchFilteredTwitterItems(tag) {
    this.loading = true;
    try {
      const response = await axios.get(
        'http://localhost:3000/api/twitter-items',
        {
          params:
            tag === 'hot'
              ? {date: moment().subtract(1, 'days').toDate()}
              : {tag: tag},
        },
      );
      const data = response.data.map((item) => new TwitterItem(item));
      runInAction(() => {
        this.twitterItems.set(tag, data);
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

export default new TwitterStore();
