import React, { FC } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { colors } from '../config/colors'

interface Props {
  customStyles?: StyleProp<ViewStyle>
}
const Container: FC<Props> = ({ children, customStyles }) => {
  return <View style={[styles.container, customStyles]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: colors.black,
  },
})

export default Container
