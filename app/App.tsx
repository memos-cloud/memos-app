import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import { Text } from 'react-native'
import { Center } from './src/components/Center'

export default () => {
  const [fontsLoaded] = useFonts({
    'Poppins-regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Center>
      <Text
        style={{ color: 'blue' }}
        onPress={async () => {
          await WebBrowser.openBrowserAsync('http://192.168.1.5:3000/google', {
            showInRecents: true,
          })
        }}
      >
        Google
      </Text>
    </Center>
  )
}
