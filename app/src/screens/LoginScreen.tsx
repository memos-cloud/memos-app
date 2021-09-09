import { LinearGradient } from 'expo-linear-gradient'
import * as SplashScreen from 'expo-splash-screen'
import * as WebBrowser from 'expo-web-browser'
import React, { FC, useEffect, useState } from 'react'
import { ImageBackground, Platform, StyleSheet, View } from 'react-native'
import { AuthNavProps } from '../@types/NavProps'
import { useStoreState } from '../@types/typedHooks'
import Container from '../components/Container'
import { MyButton } from '../components/MyButton'
import { MyText } from '../components/MyText'
import { serverURL } from '../constants/serverURL'
import * as Device from 'expo-device'
import * as Constants from 'expo-constants'

const linearGradient = ['#0F0F0F', 'rgba(15, 15, 15, 0.2)']

export const LoginScreen: FC<AuthNavProps<'Login'>> = () => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const ContinueWithGoogleHandler = async () => {
    const deviceId = Constants.default.deviceId
    console.log(deviceId)
    if (Platform.OS === 'android') {
      await WebBrowser.openBrowserAsync(
        `${serverURL}/google?deviceId=${deviceId}`
      )
    }
  }
  useEffect(() => {
    const removeSplashScreen = async () => {
      await SplashScreen.hideAsync()
    }

    if (imageLoaded) removeSplashScreen()
  }, [imageLoaded])

  const colors = useStoreState((state) => state.theme)

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../assets/Images/login.png')}
      onLoadEnd={() => setImageLoaded(true)}
    >
      <LinearGradient
        style={{ flex: 1 }}
        start={[0, 0]}
        end={[1, 1]}
        colors={linearGradient}
      >
        <Container
          customStyles={{
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: null as any,
            padding: 20,
          }}
        >
          <MyText customStyles={styles.backgroundOverlay}>
            Manage and Sync your best moments with Memos.
          </MyText>
          <View>
            <MyButton
              customStyles={styles.loginBtn}
              bg={colors.google}
              text='Continue With Google'
              icon={require('../assets/Images/google.png')}
              onPress={ContinueWithGoogleHandler}
            />
            <MyButton
              customStyles={styles.loginBtn}
              bg={colors.facebook}
              text='Continue With Facebook'
              icon={require('../assets/Images/facebook.png')}
              onPress={() => {}}
            />
          </View>
        </Container>
      </LinearGradient>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundOverlay: {
    fontSize: 35,
    borderLeftColor: 'rgba(255, 77, 41, 0.8)',
    borderLeftWidth: 4,
    paddingLeft: 20,
    marginTop: '30%',
  },
  loginBtn: {
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
})
