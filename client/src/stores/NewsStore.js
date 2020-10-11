import {observable, runInAction} from 'mobx';
import axios from 'axios';

class NewsStore {
  @observable newsItems = [];

  async fetchNewsItems() {
    try {
      const response = await axios.get('http://localhost:3000/api/news-items');
      const data = response.data;
      runInAction(() => {
        this.newsItems = data;
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new NewsStore();
