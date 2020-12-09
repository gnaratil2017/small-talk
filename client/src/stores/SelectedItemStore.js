import {makeAutoObservable, action, runInAction} from 'mobx';
import axios from 'axios';
import UserStore from './UserStore';
import getEnvVars from '../../environment';
const {apiUrl} = getEnvVars();

class SelectedItemStore {
  selectedItem = undefined;
  itemType = '';
  hasNotVoted = {};

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setSelectedItem(item, itemType) {
    this.selectedItem = item;
    this.itemType = itemType;
  }

  async getVote(tag) {
    try {
      const response = await axios.get(`${apiUrl}/${this.itemType}-votes`, {
        params: {
          voter: UserStore.id,
          item: this.selectedItem.id,
          tag: tag,
        },
      });
      const data = response.data;
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async checkHasNotVoted(tag) {
    try {
      const data = await this.getVote(tag);
      runInAction(() => {
        this.hasNotVoted[tag] = data.length === 0;
      });
    } catch (e) {
      console.log(e);
    }
  }

  sendVoteIfHasNotVoted(tag, weight) {
    if (this.hasNotVoted[tag]) {
      this.createVote(tag, weight);
      this.addVoteToItem(tag, weight);
    }
  }

  async createVote(tag, weight) {
    try {
      await axios.post(`${apiUrl}/${this.itemType}-votes`, {
        voter: UserStore.id,
        item: this.selectedItem.id,
        tag: tag,
        weight: weight,
      });
      runInAction(() => {
        this.hasNotVoted[tag] = false;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async addVoteToItem(tag, weight) {
    try {
      await axios.put(
        `${apiUrl}/${this.itemType}-items/${this.selectedItem.id}`,
        {
          tag: tag,
          weight: weight,
        },
      );
    } catch (e) {
      console.log(e);
    }
  }
}

export default new SelectedItemStore();
