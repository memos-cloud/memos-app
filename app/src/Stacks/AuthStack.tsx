import {
  LinkingOptions,
  NavigationContainer,
  Theme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import * as Linking from 'expo-linking'
import { AuthStackParamList } from '../@types/StackParamList'
import { LoginScreen } from '../screens/LoginScreen'
import { SaveTokenScreen } from '../screens/SaveTokenScreen'
import { StatusBar } from 'expo-status-bar'

const Stack = createNativeStackNavigator<AuthStackParamList>()

const prefix = Linking.makeUrl('/')

const linking: LinkingOptions<{
  SaveToken: unknown
}> = {
  prefixes: [prefix],
  config: {
    screens: {
      SaveToken: { path: 'SaveToken/:token' },
    },
  },
}
export const AuthStack = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='SaveToken' component={SaveTokenScreen} />
      </Stack.Navigator>
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        style='light'
      />
    </NavigationContainer>
  )
}
