import React from 'react'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'

import ListScreen from '../screens/ListScreen'

const Tab = createMaterialTopTabNavigator()

const tabNames = [
  'all',
  'family-friendly',
  'NSFW',
  'humorous',
  'political',
  'entertaining',
  'controversial',
]

export default function AppNavigator() {
  const scheme = useColorScheme()

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <TabNavigator/>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppearanceProvider>
  )
}

function TabNavigator() {
  const insets = useSafeAreaInsets()

  return (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        labelStyle: { fontSize: 12 },
        tabStyle: { width: 100, paddingTop: insets.top },
      }}
    >
      {tabNames.map(tabName => (
        <Tab.Screen key={tabName} name={tabName} component={ListScreen} />
      ))}
    </Tab.Navigator>
  )
}
