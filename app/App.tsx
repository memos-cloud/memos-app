import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import * as Linking from 'expo-linking'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { CustomButton } from './src/components/Button'
import { Center } from './src/components/Center'

export default () => {
  const [text, setText] = useState('')

  const [fontsLoaded] = useFonts({
    'Poppins-regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Center>
      {/* <Text
        style={{ color: 'blue' }}
        onPress={async () => {
          await WebBrowser.openBrowserAsync('http://192.168.1.5:3000/google', {
            showInRecents: true,
          })
        }}
      >
        Google
      </Text> */}
      <TextInput
        onChangeText={(txt) => setText(txt)}
        value={text}
        style={{
          padding: 10,
          width: '90%',
          margin: 10,
          borderWidth: 2,
          borderColor: '#00e676',
          borderRadius: 12,
        }}
        placeholder='Type a Message'
      />
      <CustomButton
        styling={{ bg: '#00e676' }}
        text='Send Whatsapp Message'
        onPress={async () => {
          try {
            await Linking.openURL(
              `whatsapp://send?phone=+201015157471&text=${text}`
            )
          } catch (error) {
            console.log(error)
          }
        }}
      />
    </Center>
  )
}
