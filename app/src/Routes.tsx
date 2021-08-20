import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { AuthStackParamList } from './@types/AuthStackParamList'
import { MyText } from './components/MyText'
import { LoginScreen } from './screens/LoginScreen'
import { StatusBar } from 'expo-status-bar'
import { MyHeader } from './components/Header'

const Stack = createNativeStackNavigator<AuthStackParamList>()

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          header: ({ route: { name } }) => <MyHeader title={name} />,
        }}
      >
        <Stack.Screen name='Login' component={LoginScreen} />
      </Stack.Navigator>
      <StatusBar animated={true} style='light' />
    </NavigationContainer>
  )
}

export default Routes
