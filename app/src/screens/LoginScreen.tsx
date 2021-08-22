import { LinearGradient } from 'expo-linear-gradient'
import * as WebBrowser from 'expo-web-browser'
import React, { FC } from 'react'
import { ImageBackground, Platform, StyleSheet, View } from 'react-native'
import { AuthNavProps } from '../@types/NavProps'
import Container from '../components/Container'
import { MyButton } from '../components/MyButton'
import { MyText } from '../components/MyText'
import { colors } from '../config/colors'
import * as Linking from 'expo-linking'

const linearGradient = ['#0F0F0F', 'rgba(15, 15, 15, 0.2)']

export const LoginScreen: FC<AuthNavProps<'Login'>> = () => {
  console.log(Linking.makeUrl())
  const ContinueWithGoogleHandler = async () => {
    if (Platform.OS === 'android') {
      await WebBrowser.openBrowserAsync(`http://192.168.1.5:3000/google`, {
        showInRecents: true,
      })
    }
  }

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../assets/Images/login.png')}
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
