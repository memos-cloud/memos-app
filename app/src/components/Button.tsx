import React, { FC } from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

interface Props {
  onPress: () => any
  text: string
  styling?: { bg?: string; color?: string }
}

const CustomButton: FC<Props> = ({ text, onPress, styling }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[styles.button, { backgroundColor: styling?.bg }]}>
        <Text
          style={styling?.color ? { color: styling?.color } : styles.btnText}
        >
          {text}
        </Text>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    width: '90%',
    padding: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 19,
  },
})

export { CustomButton }
