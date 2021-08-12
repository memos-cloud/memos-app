import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import React from 'react'
import Routes from './src/Routes'

export default () => {
  const [fontsLoaded] = useFonts({
    'Poppins-regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return <Routes />
  }
}
