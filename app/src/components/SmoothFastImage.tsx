import _ from 'lodash'
import React, { FC, memo } from 'react'
import { ImageStyle, StyleProp } from 'react-native'
import FastImage, { ResizeMode, Source } from 'react-native-fast-image'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface Props {
  resizeMode: ResizeMode
  style: StyleProp<ImageStyle>
  source: number | Source
  id?: string
}

export const SmoothFastImage: FC<Props> = memo(
  ({ resizeMode, source, style }) => {
    const imageTransition = useSharedValue(0)

    const animatedStyles = useAnimatedStyle(() => {
      return { opacity: imageTransition.value }
    })

    return (
      <Animated.View style={[animatedStyles]}>
        <FastImage
          source={source}
          resizeMode={resizeMode}
          style={style as any}
          onLoadEnd={() =>
            (imageTransition.value = withTiming(1, {
              duration: 150,
            }))
          }
        />
      </Animated.View>
    )
  },
  (prev, next) => {
    if (prev.id) {
      return prev.id === next.id
    }
    return _.isEqual(prev.source, next.source)
  }
)
