import * as Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import * as WebBrowser from 'expo-web-browser'
import React, { FC } from 'react'
import { ImageBackground, Platform, StyleSheet, View } from 'react-native'
import { AuthNavProps } from '../@types/NavProps'
import { useStoreState } from '../state-management/typedHooks'
import Container from '../components/Container'
import { MyButton } from '../components/MyButton'
import { MyText } from '../components/MyText'
import { serverURL } from '../constants/serverURL'

const LoginBackground = require('../assets/Images/login.png')
const GoogleIcon = require('../assets/Images/google.png')
const FacebookIcon = require('../assets/Images/facebook.png')

const linearGradient = ['#0F0F0F', 'rgba(15, 15, 15, 0.2)']

export const LoginScreen: FC<AuthNavProps<'Login'>> = () => {
  const ContinueWithGoogleHandler = async () => {
    const { deviceId } = Constants.default

    if (Platform.OS === 'android') {
      await WebBrowser.openBrowserAsync(
        `${serverURL}/auth/google?deviceId=${deviceId}`,
      )
    }
  }
  const ContinueWithFacebookHandler = async () => {
    const { deviceId } = Constants.default

    if (Platform.OS === 'android') {
      await WebBrowser.openBrowserAsync(
        `${serverURL}/auth/facebook?deviceId=${deviceId}`,
      )
    }
  }

  const colors = useStoreState((state) => state.theme)

  return (
    <ImageBackground style={styles.backgroundImage} source={LoginBackground}>
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
              text="Continue With Google"
              icon={GoogleIcon}
              onPress={ContinueWithGoogleHandler}
            />
            <MyButton
              customStyles={styles.loginBtn}
              bg={colors.facebook}
              text="Continue With Facebook"
              icon={FacebookIcon}
              onPress={ContinueWithFacebookHandler}
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
