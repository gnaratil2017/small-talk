import {observable, runInAction} from 'mobx';
import axios from 'axios';
import NewsItem from './NewsItem';

class NewsStore {
  @observable newsItems = [];

  async fetchNewsItems() {
    try {
      const response = await axios.get('http://localhost:3000/api/news-items');
      const data = response.data.map((item) => new NewsItem(item));
      runInAction(() => {
        this.newsItems = data;
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new NewsStore();
