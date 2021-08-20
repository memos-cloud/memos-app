import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import Container from '../components/Container'
import { MyButton } from '../components/MyButton'
import { colors } from '../config/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { MyText } from '../components/MyText'

export function LoginScreen() {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../assets/Images/login.png')}
    >
      <LinearGradient
        style={{ flex: 1 }}
        start={[0, 0]}
        end={[1, 1]}
        colors={['#0F0F0F', 'rgba(15, 15, 15, 0.2)']}
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
              onPress={() => {}}
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
    marginTop: 30,
  },
  loginBtn: {
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
})
