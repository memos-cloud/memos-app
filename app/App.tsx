import { StoreProvider } from 'easy-peasy'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { color } from 'react-native-reanimated'
import { colors } from './src/config/colors'
import Routes from './src/Routes'
import { store } from './src/state-management/store'

export default () => {
  const [fontsLoaded] = useFonts({
    'Poppins-regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return (
      <>
        <AppLoading />
        <StatusBar animated={true} backgroundColor={colors.secondary} />
      </>
    )
  }

  return (
    <StoreProvider store={store}>
      <Routes />
    </StoreProvider>
  )
}
