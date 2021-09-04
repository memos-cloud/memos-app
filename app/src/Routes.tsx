import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useQueryClient } from 'react-query'
import { useStoreActions, useStoreState } from './@types/typedHooks'
import { getProfile } from './api/getProfile'
import { AppStack } from './Stacks/AppStack'
import { AuthStack } from './Stacks/AuthStack'

function Routes() {
  const [loading, setLoading] = useState(true)
  const accessToken = useStoreState((state) => state.accessToken)
  const Login = useStoreActions((state) => state.Login)

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const accessTokenExists = await AsyncStorage.getItem('accessToken')

      if (accessTokenExists) {
        const decoded: { exp: number } = jwt_decode(accessTokenExists)
        const expired = decoded.exp < Date.now() / 1000

        if (!expired) {
          Login(accessTokenExists)
        }
      }
      setLoading(false)
    }
    checkLoggedInUser()
  }, [])

  const colors = useStoreState((state) => state.theme)

  if (!loading && accessToken) {
    return (
      <View style={{ backgroundColor: colors.black, flex: 1 }}>
        <AppStack />
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
