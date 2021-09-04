import React from 'react'
import { StyleSheet } from 'react-native'
import { Center } from '../components/Center'
import Container from '../components/Container'
import { MyText } from '../components/MyText'

const SettingsScreen = () => {
  return (
    <Container>
      <Center>
        <MyText>Settings</MyText>
      </Center>
    </Container>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({})
