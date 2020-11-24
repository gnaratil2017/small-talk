import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'mobx-react';
import AppNavigator from './src/navigation/AppNavigator';
import UIStore from './src/stores/UIStore';
import NewsStore from './src/stores/NewsStore';
import YoutubeStore from './src/stores/YoutubeStore';
import TwitterStore from './src/stores/TwitterStore';
import SelectedItemStore from './src/stores/SelectedItemStore';

export default function App() {
  return (
    <Provider
      uiStore = {UIStore}
      newsStore={NewsStore}
      youtubeStore={YoutubeStore}
      twitterStore={TwitterStore}
      selectedItemStore={SelectedItemStore}>
      <AppNavigator />
    </Provider>
  );
}
