import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'mobx-react';
import NewsStore from './src/stores/NewsStore';
import YoutubeStore from './src/stores/YoutubeStore';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <Provider newsStore={NewsStore} youtubeStore={YoutubeStore}>
      <AppNavigator />
    </Provider>
  );
}
