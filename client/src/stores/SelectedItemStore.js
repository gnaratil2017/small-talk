import {makeAutoObservable, action, runInAction} from 'mobx';
import axios from 'axios';
import UserStore from './UserStore';

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
      const response = await axios.get(
        `http://localhost:3000/api/${this.itemType}-votes`,
        {
          params: {
            voter: UserStore.id,
            item: this.selectedItem.id,
            tag: tag,
          },
        },
      );
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
      weight > 0 && this.addVoteToItem(tag, weight);
    }
  }

  async createVote(tag, weight) {
    try {
      await axios.post(`http://localhost:3000/api/${this.itemType}-votes`, {
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
        `http://localhost:3000/api/${this.itemType}-items/${this.selectedItem.id}`,
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
