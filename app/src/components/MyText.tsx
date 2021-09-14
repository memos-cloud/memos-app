import React, { FC } from 'react'
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native'
import { Fonts } from '../@types/fonts'
import { useStoreState } from '../@types/typedHooks'

interface Props {
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg'
  customStyles?: StyleProp<TextStyle>
  numberOfLines?: number
}

const MyText: FC<Props> = ({ children, size, customStyles, numberOfLines }) => {
  const fontSize = () => {
    if (size == 'md') {
      return 18
    } else if (size == 'lg') {
      return 24
    } else if (size == 'xs') {
      return 14
    } else if (size == '2xs') {
      return 11
    } else {
      return 16
    }
  }
  const colors = useStoreState((state) => state.theme)

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        { fontSize: fontSize(), color: colors.white },
        styles.text,
        customStyles,
      ]}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts['Poppins-regular'],
  },
})

export { MyText }
