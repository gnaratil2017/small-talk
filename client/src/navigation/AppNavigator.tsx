import React from 'react'
import {AppearanceProvider, useColorScheme} from 'react-native-appearance'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

import ListScreen from '../screens/ListScreen'

const Tab = createMaterialTopTabNavigator()

const tabNames = [
  'hot',
  'family-friendly',
  'NSFW',
  'humorous',
  'political',
  'entertaining',
  'controversial',
]

const AppNavigator: React.FC = () => {
  const scheme = useColorScheme()

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <TabNavigator />
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
        labelStyle: {textTransform: 'none'},
        tabStyle: {height: 100, width: 120, paddingTop: insets.top},
      }}>
      {tabNames.map((tabName) => (
        <Tab.Screen key={tabName} name={tabName} component={ListScreen} />
      ))}
    </Tab.Navigator>
  )
}

export default AppNavigator
