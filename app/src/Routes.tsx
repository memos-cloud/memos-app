import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from './@types/typedHooks'
import { AppStack } from './Stacks/AppStack'
import { AuthStack } from './Stacks/AuthStack'

function Routes() {
  const [loading, setLoading] = useState(true)
  const accessToken = useStoreState((state) => state.accessToken)
  const Login = useStoreActions((state) => state.LoginAction)

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const accessTokenExists = await AsyncStorage.getItem('accessToken')

      if (accessTokenExists) {
        const decoded: { exp: number } = jwt_decode(accessTokenExists)
        const expired = decoded.exp < Date.now() / 1000

        if (!expired) Login(accessTokenExists)
      }
      setLoading(false)
    }
    checkLoggedInUser()
  }, [])

  if (!loading && accessToken) {
    return <AppStack />
  }
  return <AuthStack />
}

export default Routes
