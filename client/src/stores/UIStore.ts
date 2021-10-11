import {makeAutoObservable, action} from 'mobx'

class UIStore {
  modalVisible = false;

  constructor() {
    makeAutoObservable(this)
  }

  setModalVisible = action((bool: boolean) => {
    this.modalVisible = bool
  })
}

export default new UIStore()
