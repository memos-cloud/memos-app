import * as Constants from 'expo-constants'
import * as LocalAuthentication from 'expo-local-authentication'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStoreActions, useStoreState } from '../@types/typedHooks'
import { FingerPrintIcon } from '../components/icons/FingerPrint'
import { LockIcon } from '../components/icons/LockIcon'

const { width } = Dimensions.get('window')

export const FingerPrintScreen = () => {
  const colors = useStoreState((state) => state.theme)
  const authenticate = useStoreActions((state) => state.authenticate)

  useEffect(() => {
    handleBiometricAuth()
  }, [])

  const handleBiometricAuth = async () => {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Memos',
    })

    if (auth.success) {
      authenticate()
    } else {
      handleBiometricAuth()
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: 0,
            paddingTop: Constants.default.statusBarHeight,
            opacity: 0.2,
          }}
        >
          <LockIcon size={35} />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            opacity: 0.05,
          }}
        >
          <View>
            <FingerPrintIcon size={width * 1.4} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
