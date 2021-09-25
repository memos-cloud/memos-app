import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import * as LocalAuthentication from 'expo-local-authentication'
import { Alert } from 'react-native'
import { MyButton } from '../components/MyButton'
import { useStoreState } from '../@types/typedHooks'
import { Center } from '../components/Center'

export const AuthScreen = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false)

  const colors = useStoreState((state) => state.theme)

  useEffect(() => {
    ;(async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync()
      setIsBiometricSupported(compatible)
    })()
  })

  useEffect(() => {
    if (isBiometricSupported) {
      handleBiometricAuth()
    } else {
      // Go to PIN Code Screen!
    }
  }, [isBiometricSupported])

  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync()

    if (!savedBiometrics) {
      // Go to PIN Code Screen!
      return Alert.alert(
        'Biometric record not found',
        'Please verify your identity with your password',
        [
          {
            text: 'Ok',
            onPress: () => {
              console.log('PIN Code Instead!')
            },
          },
        ]
      )
    } else {
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with Memos',
      })

      console.log(auth)
    }
  }

  return (
    <Container>
      <Center>
        <MyButton
          btnStyles={{
            paddingHorizontal: 18,
            paddingVertical: 14,
          }}
          text={'Try Again'}
          bg={colors.primary}
          onPress={handleBiometricAuth}
        />
      </Center>
    </Container>
  )
}
