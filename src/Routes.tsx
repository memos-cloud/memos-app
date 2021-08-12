import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { RootStackParamList } from './@types/RootStackParamList'
import { Login } from './screens/Login'
import { Playground } from './screens/Playground'
import { Register } from './screens/Register'

interface Props {}

const Stack = createNativeStackNavigator<RootStackParamList>()

const Routes: FC<Props> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Playground'>
        <Stack.Screen
          options={{ title: 'Playground' }}
          name='Playground'
          component={Playground}
        />
        <Stack.Screen
          options={{ title: 'Sign in' }}
          name='Login'
          component={Login}
        />
        <Stack.Screen
          options={{ title: 'Sign up' }}
          name='Register'
          component={Register}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
