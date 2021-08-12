import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { NavProps } from '../@types/genNavigationTypes'
import { Center } from '../components/Center'
import { globalStyles } from '../styles/global'

const Login = ({ navigation, route }: NavProps<'Login'>) => {
  const [name, setName] = useState('')

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.container}>
        <Center>
          <Text style={globalStyles.titleText}>{route.name}</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              width: '100%',
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
            }}
          />
          <Button
            title='Save'
            onPress={async () => {
              await AsyncStorage.setItem('name', name)
            }}
          />
          {/* <Button
            title='Register'
            onPress={() => navigation.navigate('Register')}
          /> */}
        </Center>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({})

export { Login }
