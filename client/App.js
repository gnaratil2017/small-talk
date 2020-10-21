import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'mobx-react';
import NewsStore from './src/stores/NewsStore';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <Provider newsStore={NewsStore}>
      <AppNavigator />
    </Provider>
  );
}
