import { StoreProvider } from 'easy-peasy'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { LogBox, View } from 'react-native'
import { QueryClientProvider } from 'react-query'
import { useStoreState } from './src/@types/typedHooks'
import Routes from './src/Routes'
import { queryClient, store } from './src/state-management/stores'

SplashScreen.preventAutoHideAsync().catch(console.warn) // it's good to explicitly catch and inspect any error

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
