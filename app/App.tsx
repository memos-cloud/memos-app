import { StoreProvider } from 'easy-peasy'
import AppLoading from 'expo-app-loading'
import * as Constants from 'expo-constants'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { I18nManager, LogBox, StyleSheet } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import 'react-native-get-random-values'
import { QueryClientProvider } from 'react-query'
import * as Sentry from 'sentry-expo'
import { Fonts } from './src/@types/fonts'
import Routes from './src/Routes'
import { queryClient, store } from './src/state-management/react-query-store'

// Require Fonts
const PoppinsRegularFont = require('./src/assets/fonts/Poppins-Regular.ttf')
const PoppinsBoldFont = require('./src/assets/fonts/Poppins-Bold.ttf')

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
    return <AppLoading autoHideSplash={false} />
  }

  LogBox.ignoreLogs(['Setting a timer'])

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
        <StatusBar animated backgroundColor="transparent" style="light" />
        <Routes />
        <FlashMessage
          statusBarHeight={Constants.default.statusBarHeight}
          position="top"
          icon="warning"
          color="black"
          floating
          titleStyle={styles.flashMessageStyles}
          textStyle={styles.flashMessageStyles}
        />
      </StoreProvider>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  flashMessageStyles: {
    fontFamily: Fonts['Poppins-regular'],
    transform: [{ translateY: 1.4 }],
  },
})
