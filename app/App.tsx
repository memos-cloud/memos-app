import { StoreProvider } from 'easy-peasy'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { I18nManager, LogBox } from 'react-native'
import 'react-native-get-random-values'
import { QueryClientProvider } from 'react-query'
import * as Sentry from 'sentry-expo'
import Routes from './src/Routes'
import { queryClient, store } from './src/state-management/stores'

// Require Fonts
const PoppinsRegularFont = require('./src/assets/fonts/Poppins-Regular.ttf')
const PoppinsBoldFont = require('./src/assets/fonts/Poppins-Bold.ttf')

I18nManager.forceRTL(false)
I18nManager.allowRTL(false)

Sentry.init({
  dsn: 'https://acfd7902ab8740fcacce9c7ceec3729c@o1003933.ingest.sentry.io/5964826',
})

export default () => {
  const [fontsLoaded] = useFonts({
    'Poppins-regular': PoppinsRegularFont,
    'Poppins-bold': PoppinsBoldFont,
  })

  if (!fontsLoaded) {
    return <AppLoading autoHideSplash />
  }

  LogBox.ignoreLogs(['Setting a timer'])

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
        <StatusBar animated backgroundColor="transparent" style="light" />
        <Routes />
      </StoreProvider>
    </QueryClientProvider>
  )
}
