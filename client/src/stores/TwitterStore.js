import {observable, runInAction} from 'mobx';
import axios from 'axios';
import TwitterItem from './TwitterItem';

class TwitterStore {
  @observable twitterItems = [];

  async fetchTwitterItems() {
    try {
      const response = await axios.get('http://localhost:3000/api/twitter-items');
      const data = response.data.map((item) => new TwitterItem(item));
      runInAction(() => {
        this.twitterItems = data;
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new TwitterStore();
