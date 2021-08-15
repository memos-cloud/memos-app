import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import React from 'react'
import { Linking, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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
        onPress={() => Linking.openURL('https://devoops.gq/auth/github')}
      >
        Google
      </Text>
    </Center>
  )
}
