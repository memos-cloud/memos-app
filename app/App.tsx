import { StoreProvider } from 'easy-peasy'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { LogBox } from 'react-native'
import 'react-native-get-random-values'
import { QueryClientProvider } from 'react-query'
import Routes from './src/Routes'
import { queryClient, store } from './src/state-management/stores'
import * as Sentry from 'sentry-expo'

Sentry.init({
  dsn: 'https://acfd7902ab8740fcacce9c7ceec3729c@o1003933.ingest.sentry.io/5964826',
})

SplashScreen.preventAutoHideAsync().catch(console.warn)

export default () => {
  const [fontsLoaded] = useFonts({
    'Poppins-regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return <></>
  }

  LogBox.ignoreLogs(['Setting a timer'])

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
        <StatusBar
          animated={true}
          backgroundColor={'transparent'}
          style='light'
        />
        <Routes />
      </StoreProvider>
    </QueryClientProvider>
  )
}
