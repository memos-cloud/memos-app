import * as Constants from 'expo-constants'
import * as LocalAuthentication from 'expo-local-authentication'
import LottieView from 'lottie-react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStoreActions, useStoreState } from '../state-management/typedHooks'
import { LockIcon } from '../components/icons/LockIcon'
import FingerPrintLottie from '../assets/lotties/fingerprint.json'
import { MyText } from '../components/MyText'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MyButton } from '../components/MyButton'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width } = Dimensions.get('window')

export const FingerPrintScreen = () => {
  const colors = useStoreState((state) => state.theme)
  const authenticate = useStoreActions((state) => state.authenticate)
  const animation = useRef<React.LegacyRef<LottieView>>(null)
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    handleBiometricAuth()
  }, [])

  const handleBiometricAuth = async () => {
    setTimeout(() => setCancelled(false), 300)

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Memos',
    })

    if (auth.success) {
      const isSetup = await AsyncStorage.getItem('fingerprintSetup')
      if (!isSetup) {
        await AsyncStorage.setItem('fingerprintSetup', 'true')
      }
      authenticate()
    } else {
      setCancelled(true)
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
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LottieView
            ref={animation}
            style={{
              width: width * 1.4,
              height: width * 1.4,
              opacity: 0.8,
            }}
            source={FingerPrintLottie}
          />

          {cancelled && (
            <MyButton
              customStyles={{
                borderRadius: 10,
              }}
              btnStyles={{ paddingVertical: 12, borderRadius: 10 }}
              bg={colors.primary}
              onPress={handleBiometricAuth}
              text="Try Again"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}
