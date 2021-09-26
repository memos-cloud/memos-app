import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from 'expo-app-loading'
import jwtDecode from 'jwt-decode'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useStoreActions, useStoreState } from './@types/typedHooks'
import { AppStack } from './Stacks/AppStack'
import { Auth2Stack } from './Stacks/Auth2Stack'
import { AuthStack } from './Stacks/AuthStack'

function Routes() {
  const [loading, setLoading] = useState(true)
  const accessToken = useStoreState((state) => state.accessToken)
  const Login = useStoreActions((state) => state.Login)
  const getTheme = useStoreActions((state) => state.getTheme)
  const authenticated = useStoreState((state) => state.authenticated)

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const accessTokenExists = await AsyncStorage.getItem('accessToken')

      if (accessTokenExists) {
        const decoded: { exp: number } = jwtDecode(accessTokenExists)
        const expired = decoded.exp < Date.now() / 1000

        if (!expired) {
          await Login(accessTokenExists)
          await getTheme()
        }
      }
      setLoading(false)
    }
    checkLoggedInUser()
  }, [])

  const colors = useStoreState((state) => state.theme)

  if (loading) {
    return <AppLoading />
  }

  if (!loading && accessToken) {
    return (
      <View style={{ backgroundColor: colors.black, flex: 1 }}>
        {authenticated ? <AppStack /> : <Auth2Stack />}
      </View>
    )
  }

  return (
    <View style={{ backgroundColor: colors.black, flex: 1 }}>
      <AuthStack />
    </View>
  )
}

export default Routes
