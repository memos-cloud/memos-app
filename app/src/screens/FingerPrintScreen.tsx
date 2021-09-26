import * as Constants from 'expo-constants'
import * as LocalAuthentication from 'expo-local-authentication'
import LottieView from 'lottie-react-native'
import React, { useEffect, useRef } from 'react'
import { Dimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStoreActions, useStoreState } from '../@types/typedHooks'
import { LockIcon } from '../components/icons/LockIcon'

const FingerPrintLottie = require('../assets/lotties/fingerprint.json')

const { width } = Dimensions.get('window')

export const FingerPrintScreen = () => {
  const colors = useStoreState((state) => state.theme)
  const authenticate = useStoreActions((state) => state.authenticate)
  const animation = useRef<React.LegacyRef<LottieView>>(null)

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
      setTimeout(() => {
        handleBiometricAuth()
      }, 1000)
    }
  }

  useEffect(() => {
    if (animation.current) {
      animation.current.play()
    }
  }, [animation])
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
          }}
        >
          <LottieView
            ref={animation}
            style={{
              width: width * 1.5,
              height: width * 1.5,
            }}
            source={FingerPrintLottie}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
