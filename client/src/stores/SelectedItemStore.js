import {makeAutoObservable, action} from 'mobx';

class SelectedItemStore {
  selectedItem = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setSelectedItem(item) {
    this.selectedItem = item;
  }

  @action
  sendVotes(tag, votes) {}
}

export default new SelectedItemStore();
