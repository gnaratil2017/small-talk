import {makeAutoObservable, runInAction} from 'mobx';
import axios from 'axios';
import getEnvVars from '../../environment';
const {apiUrl} = getEnvVars();

class UserStore {
  id = '';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchOrCreateUser(id) {
    try {
      const response = await axios.get(`${apiUrl}/users/${id}`);
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
      const response = await axios.post(`${apiUrl}/users`, {
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
