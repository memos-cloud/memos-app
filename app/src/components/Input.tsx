import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { Fonts } from '../@types/fonts'
import { colors } from '../config/colors'
import { MyText } from './MyText'

interface Props {
  onChangeText: any
  onBlur: any
  value: string
  label: string
  placeholder?: string
}

export default function Input({
  onBlur,
  onChangeText,
  value,
  label,
  placeholder,
}: Props) {
  return (
    <View style={styles.parent}>
      <MyText size='md' customStyles={styles.label}>
        {label} :
      </MyText>
      <TextInput
        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
        placeholder={placeholder}
        style={styles.input}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  parent: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.white,
    borderRadius: 9,
    paddingVertical: 10,
    paddingHorizontal: 10 * 1.5,
    color: colors.white,
    fontFamily: Fonts['Poppins-regular'],
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    fontSize: 15,
  },
  label: {
    marginBottom: 5,
  },
})
