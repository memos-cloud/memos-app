import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { RootStackParamList } from '../@types/RootStackParamList'
import { Center } from '../components/Center'
import { globalStyles } from '../styles/global'

const Register = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Register'>) => {
  return (
    <View style={globalStyles.container}>
      <Center>
        <Text style={globalStyles.titleText}>Register</Text>
        <Button title='Login' onPress={() => navigation.goBack()} />
      </Center>
    </View>
  )
}

const styles = StyleSheet.create({})

export { Register }
