import React from 'react'
import { FC } from 'react'
import { GestureResponderEvent, View, ViewStyle } from 'react-native'
import Ripple from 'react-native-material-ripple'
import { colors } from '../config/colors'

interface Props {
  tabWidth: number
  onPress: ((event: GestureResponderEvent) => void) | undefined
  style?: ViewStyle
}

export const IconWrapper: FC<Props> = ({
  tabWidth,
  children,
  onPress,
  style,
}) => {
  return (
    <Ripple
      onPress={onPress}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          width: tabWidth,
          height: tabWidth,
        },
        style,
      ]}
      rippleOpacity={0.018}
      rippleSize={500}
      rippleColor={colors.white}
      rippleCentered={true}
      rippleDuration={520}
      rippleContainerBorderRadius={100}
    >
      {children}
    </Ripple>
  )
}
