import React from 'react'
import { StyleSheet } from 'react-native'
import { Center } from '../components/Center'
import Container from '../components/Container'
import { MyText } from '../components/MyText'

const HomeScreen = () => {
  return (
    <Container>
      <Center>
        <MyText>Home</MyText>
      </Center>
    </Container>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
