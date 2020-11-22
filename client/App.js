import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'mobx-react';
import UIStore from './src/stores/UIStore';
import NewsStore from './src/stores/NewsStore';
import YoutubeStore from './src/stores/YoutubeStore';
import TwitterStore from './src/stores/TwitterStore';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <Provider
      uiStore = {UIStore}
      newsStore={NewsStore}
      youtubeStore={YoutubeStore}
      twitterStore={TwitterStore}>
      <AppNavigator />
    </Provider>
  );
}
