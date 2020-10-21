import {action, observable, runInAction} from 'mobx';
import axios from 'axios';
import NewsItem from './NewsItem';

class NewsStore {
  @observable newsItems = [];
  // transformer = createTransformer((item) => new NewsItem(item));

  async fetchNewsItems() {
    try {
      const response = await axios.get('http://localhost:3000/api/news-items');
      // console.log(response.data)
      // const data = response.data.map(item => ({
      //   NewsItem(item)
      // }))
      // console.log(response.data[0])
      const data = response.data.map((item) => new NewsItem(item));
      // const data = response.data;
      runInAction(() => {
        this.newsItems = data;
      });
    } catch (e) {
      console.log(e);
    }
  }

  // @action
  // toggleIsExpanded(id) {
  //   console.log('here')
  //   const item = this.newsItems.find(item => item._id === id)
  //   item.isExpanded = !item.isExpanded
  //   console.log(item.isExpanded)
  // };
}

export default new NewsStore();
