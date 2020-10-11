import {observable, runInAction} from 'mobx'

class NewsStore {
  @observable newsItems = [];

  async fetchNewsItems() {
    try {
      const response = await fetch('http://localhost:3000/api/news-items');
      const newsItems = await response.json();
      runInAction(() => {
          this.newsItems = newsItems;
      })
    } catch (e) {
        console.log(e)
    }
    // console.log(this.newsItems)
  };

  // @action
  // setNewsItems = (response) => {
  //   this.newsItems = response.json();
  //   console.log(this.newsItems)
  // }
}

export default new NewsStore();
