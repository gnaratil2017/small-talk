import {observable, runInAction} from 'mobx';
import axios from 'axios';
import moment from 'moment';
import TwitterItem from './TwitterItem';

class TwitterStore {
  @observable twitterItems = [];

  async fetchRecentTwitterItems() {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/twitter-items',
        {params: {date: moment().subtract(1, 'days').toDate()}},
      );
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
