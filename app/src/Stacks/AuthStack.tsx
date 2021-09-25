import { LinkingOptions, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Linking from 'expo-linking'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { AuthStackParamList } from '../@types/StackParamList'
import { AuthScreen } from '../screens/AuthScreen'
import { LoginScreen } from '../screens/LoginScreen'
import { SaveTokenScreen } from '../screens/SaveTokenScreen'

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
      <StatusBar animated={true} backgroundColor='transparent' style='light' />
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='SaveToken' component={SaveTokenScreen} />
        <Stack.Screen name='Auth' component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
