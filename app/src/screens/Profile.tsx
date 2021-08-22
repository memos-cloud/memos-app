import React from 'react'
import { StyleSheet } from 'react-native'
import { Center } from '../components/Center'
import Container from '../components/Container'
import { MyText } from '../components/MyText'

const ProfileScreen = () => {
  return (
    <Container>
      <Center>
        <MyText>Profile</MyText>
      </Center>
    </Container>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})
