import {observable, runInAction} from 'mobx';
import axios from 'axios';
import YoutubeItem from './YoutubeItem';

class YoutubeStore {
  @observable youtubeItems = [];

  async fetchYoutubeItems() {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/youtube-items',
      );
      const data = response.data.map((item) => new YoutubeItem(item));
      runInAction(() => {
        this.youtubeItems = data;
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new YoutubeStore();
