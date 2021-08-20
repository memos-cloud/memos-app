import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Center } from '../components/Center'
import Container from '../components/Container'
import { MyButton } from '../components/MyButton'
import { MyText } from '../components/MyText'
import { colors } from '../config/colors'

export function LoginScreen() {
  return (
    <>
      <ImageBackground
        resizeMode='contain'
        style={styles.loginImage}
        source={require('../assets/Images/login.png')}
      ></ImageBackground>

      <Container customStyles={{ paddingVertical: 0 }}>
        <MyButton
          customStyles={styles.loginBtn}
          bg={colors.primary}
          text='Continue With Google'
          icon={require('../assets/Images/google.png')}
          onPress={() => {}}
        />
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  loginBtn: {
    width: '100%',
  },
  loginImage: {
    width: '100%',
    height: 175,
    backgroundColor: colors.black,
  },
})
