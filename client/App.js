import 'react-native-gesture-handler'
import React from 'react'
import {
  StyleSheet,
  StatusBar,
  View,
} from 'react-native'

import AppNavigator from './src/navigation/AppNavigator'

export default function App() {
  return (
    <AppNavigator />
  )
}

const styles = StyleSheet.create({
})
