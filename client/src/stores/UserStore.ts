import {makeAutoObservable, runInAction} from 'mobx'
import axios from 'axios'
import getEnvVars from '../../environment'
const {apiUrl} = getEnvVars()

interface User {
  _id: string
}

interface UserResponse {
  data: User
}

class UserStore {
  id = '';

  constructor() {
    makeAutoObservable(this)
  }

  async fetchOrCreateUser(id: string) {
    try {
      const response: UserResponse = await axios.get(`${apiUrl}/users/${id}`)
      const data = response.data
      runInAction(() => {
        this.id = data._id
      })
    } catch (e) {
      if ((e.response as Response).status === 404) {
        void this.createUser(id)
      }
    }
  }

  async createUser(id: string) {
    try {
      const response: UserResponse = await axios.post(`${apiUrl}/users`, {
        id: id,
      })
      const data = response.data
      runInAction(() => {
        this.id = data._id
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export default new UserStore()
