import React, { FC } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useStoreState } from '../@types/typedHooks'

interface Props {
  customStyles?: StyleProp<ViewStyle>
}
const Container: FC<Props> = ({ children, customStyles }) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.black,
        },
        customStyles,
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
})

export default Container
