import {makeAutoObservable, runInAction} from 'mobx';
import axios from 'axios';
import moment from 'moment';
import NewsItem from './NewsItem';

class NewsStore {
  newsItems = new Map();
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchFilteredNewsItems(tag) {
    this.loading = true;
    try {
      const response = await axios.get('http://localhost:3000/api/news-items', {
        params:
          tag === 'hot'
            ? {date: moment().subtract(1, 'days').toDate()}
            : {tag: tag},
      });
      const data = response.data.map((item) => new NewsItem(item));
      runInAction(() => {
        this.newsItems.set(tag, data);
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

export default new NewsStore();
