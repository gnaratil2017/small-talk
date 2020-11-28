import {makeAutoObservable, action} from 'mobx';
import axios from 'axios';
import UserStore from './UserStore';

class SelectedItemStore {
  selectedItem = undefined;
  itemType = '';

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

  sendVoteIfHasNotVoted(tag, weight) {
    this.getVote(tag).then((data) => {
      if (data.length === 0) {
        this.sendVote(tag, weight);
      }
    });
  }

  async sendVote(tag, weight) {
    try {
      await axios.post(`http://localhost:3000/api/${this.itemType}-votes`, {
        voter: UserStore.id,
        item: this.selectedItem.id,
        tag: tag,
        weight: weight,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new SelectedItemStore();
