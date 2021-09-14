import {makeAutoObservable, action} from 'mobx'

class UIStore {
  modalVisible = false;

  constructor() {
    makeAutoObservable(this)
  }

  @action
  setModalVisible(bool) {
    this.modalVisible = bool
  }
}

export default new UIStore()
