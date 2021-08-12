import React, { FC } from 'react'
import { View } from 'react-native'

interface Props {}

const Center: FC<Props> = ({ children }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {children}
    </View>
  )
}

export { Center }
