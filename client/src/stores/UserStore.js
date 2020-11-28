import {makeAutoObservable, runInAction} from 'mobx';
import axios from 'axios';

class UserStore {
  id = '';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchOrCreateUser(id) {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${id}`);
      const data = response.data;
      runInAction(() => {
        this.id = data._id;
      });
    } catch (e) {
      if (e.response.status === 404) {
        this.createUser(id);
      }
    }
  }

  async createUser(id) {
    try {
      const response = await axios.post('http://localhost:3000/api/users', {
        id: id,
      });
      const data = response.data;
      runInAction(() => {
        this.id = data._id;
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserStore();
