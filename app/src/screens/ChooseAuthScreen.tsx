import AsyncStorage from '@react-native-async-storage/async-storage'
import * as LocalAuthentication from 'expo-local-authentication'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Ripple from 'react-native-material-ripple'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Auth2NavProps } from '../@types/NavProps'
import { useStoreActions, useStoreState } from '../@types/typedHooks'
import { Center } from '../components/Center'
import Container from '../components/Container'
import { DropDownArrow } from '../components/icons/DropDownArrow'
import { FingerPrintIcon } from '../components/icons/FingerPrint'
import { LockIcon } from '../components/icons/LockIcon'
import { PINIcon } from '../components/icons/PINIcon'
import { MyText } from '../components/MyText'
import hexToHSL from '../utils/hexToHsl'

const ChooseAuthScreen = ({ navigation }: Auth2NavProps<'ChooseAuth'>) => {
  const colors = useStoreState((state) => state.theme)
  const [checkingMethod, setCheckingMethod] = useState(true)
  const authenticate = useStoreActions((state) => state.authenticate)

  useEffect(() => {
    const checkAuthMethodIfAvailable = async () => {
      setCheckingMethod(true)
      // Is Biometrics available
      const compatible = await LocalAuthentication.hasHardwareAsync()
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync()

      if (!compatible || !savedBiometrics) {
        navigation.navigate('PINCode')
        return setTimeout(() => {
          setCheckingMethod(false)
        }, 1000)
      }

      // Check Saved Method
      const auth2 = await AsyncStorage.getItem('auth2')
      if (auth2 === 'fingerprint') {
        navigation.navigate('FingerPrint')
        return setTimeout(() => {
          setCheckingMethod(false)
        }, 1000)
      }
      if (auth2 === 'skip') {
        authenticate()
      }
      setCheckingMethod(false)
    }
    checkAuthMethodIfAvailable()
  }, [])

  const FingerPrintHandler = async () => {
    await AsyncStorage.setItem('auth2', 'fingerprint')
    navigation.navigate('FingerPrint')
  }
  const PINHandler = async () => {
    await AsyncStorage.setItem('auth2', 'PIN')
    navigation.navigate('PINCode')
  }

  const SkipHandler = async () => {
    await AsyncStorage.setItem('auth2', 'skip')
    authenticate()
  }

  const hslValue1 = hexToHSL(colors.primary)
  const hslValue2 = hexToHSL('#1b1b1b')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      {checkingMethod ? (
        <Container>
          <Center>
            <ActivityIndicator
              style={{ width: 25, height: 25 }}
              color={colors.primary}
            />
          </Center>
        </Container>
      ) : (
        <Container customStyles={{ alignItems: 'center', paddingTop: 50 }}>
          <LockIcon size={45} />
          <MyText
            customStyles={{
              textAlign: 'center',
              fontSize: 30,
              paddingVertical: 10,
            }}
            size="lg"
          >
            Choose a way to Authenticate
          </MyText>
          <Container
            customStyles={{
              padding: 0,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
            }}
          >
            <TouchableWithoutFeedback onPress={FingerPrintHandler}>
              <View style={[styles.buttonParent]}>
                <Ripple
                  rippleDuration={600}
                  rippleColor={hslValue1}
                  style={[styles.button, { backgroundColor: colors.primary }]}
                >
                  <View style={styles.btnIconParent}>
                    <View style={styles.btnIcon}>
                      <FingerPrintIcon size={32} />
                    </View>
                  </View>
                  <MyText size="md" customStyles={styles.buttonText}>
                    Fingerprint
                  </MyText>
                </Ripple>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={PINHandler}>
              <View style={[styles.buttonParent, styles.spacer]}>
                <Ripple
                  rippleDuration={600}
                  rippleColor={hslValue2}
                  style={[styles.button, { backgroundColor: '#1b1b1b' }]}
                >
                  <View style={styles.btnIconParent}>
                    <View style={styles.btnIcon}>
                      <PINIcon size={32} />
                    </View>
                  </View>
                  <MyText size="md" customStyles={styles.buttonText}>
                    PIN Code
                  </MyText>
                </Ripple>
              </View>
            </TouchableWithoutFeedback>
          </Container>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
              paddingVertical: 15,
            }}
          >
            <TouchableOpacity
              onPress={SkipHandler}
              activeOpacity={colors.activeOpacity}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingHorizontal: 15,
                paddingVertical: 10,
                opacity: 0.85,
              }}
            >
              <MyText
                size="md"
                customStyles={{
                  paddingRight: 2,
                }}
              >
                Skip
              </MyText>
              <DropDownArrow
                style={{ transform: [{ rotate: '270deg' }, { translateX: 1 }] }}
                width={15}
                fill={colors.white}
              />
            </TouchableOpacity>
          </View>
        </Container>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonParent: {
    paddingHorizontal: 15,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 6,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    textAlign: 'center',
    transform: [{ translateY: 1 }],
  },
  btnIconParent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  btnIcon: {
    marginLeft: 20,
    width: 32,
  },
  spacer: {
    marginTop: 20,
  },
})

export { ChooseAuthScreen }
