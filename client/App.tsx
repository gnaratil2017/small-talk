import 'react-native-gesture-handler'
import React from 'react'
import {Provider} from 'mobx-react'
import AppNavigator from './src/navigation/AppNavigator'
import UserStore from './src/stores/UserStore'
import UIStore from './src/stores/UIStore'
import NewsStore from './src/stores/NewsStore'
import YoutubeStore from './src/stores/YoutubeStore'
import TwitterStore from './src/stores/TwitterStore'
import SelectedItemStore from './src/stores/SelectedItemStore'
import axios from 'axios'
import {SWRConfig} from 'swr'
import getEnvVars from './environment'
import moment from 'moment'

export default function App() {
  const {apiUrl} = getEnvVars()

  const fetcher = async (endpoint: string, tag: string) => {
    const response = await axios.get(`${apiUrl}/${endpoint}`,
      { params: tag === 'hot'
        ? {date: moment().subtract(1, 'days').toDate()}
        : {tag: tag}
      })
    return response.data
  }

  return (
    <Provider
      userStore={UserStore}
      uiStore={UIStore}
      newsStore={NewsStore}
      youtubeStore={YoutubeStore}
      twitterStore={TwitterStore}
      selectedItemStore={SelectedItemStore}>
      <SWRConfig value={{ fetcher }}>
        <AppNavigator />
      </SWRConfig>
    </Provider>
  )
}
