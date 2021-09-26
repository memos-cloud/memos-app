import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Auth2StackParamList } from '../@types/StackParamList'
import { ChooseAuthScreen } from '../screens/ChooseAuthScreen'
import { FingerPrintScreen } from '../screens/FingerPrintScreen'
import { PINCodeScreen } from '../screens/PINCodeScreen'

const Stack = createNativeStackNavigator<Auth2StackParamList>()

export const Auth2Stack = () => {
  const variable = ''
  return (
    <NavigationContainer>
      <StatusBar animated backgroundColor="transparent" style="light" />
      <Stack.Navigator
        initialRouteName="ChooseAuth"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="PINCode" component={PINCodeScreen} />
        <Stack.Screen name="FingerPrint" component={FingerPrintScreen} />
        <Stack.Screen name="ChooseAuth" component={ChooseAuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
