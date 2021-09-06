import _ from 'lodash'
import React, { FC, memo, useState } from 'react'
import { useEffect } from 'react'
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
  loadFirst?: number | Source
  transitionDuration?: number
}

export const SmoothFastImage: FC<Props> = memo(
  ({ resizeMode, source, style, loadFirst, transitionDuration }) => {
    const imageTransition = useSharedValue(0)

    const animatedStyles = useAnimatedStyle(() => {
      return { opacity: imageTransition.value }
    })

    const [imgSource, setImgSource] = useState(loadFirst ? loadFirst : source)

    useEffect(() => {
      setImgSource(loadFirst ? loadFirst : source)
    }, [source])

    const imgTransitionDuration =
      transitionDuration !== undefined ? transitionDuration : 150

    return (
      <Animated.View style={[animatedStyles]}>
        <FastImage
          source={imgSource}
          onError={() => setImgSource(source)}
          resizeMode={resizeMode}
          style={style as any}
          onLoadEnd={() =>
            (imageTransition.value = withTiming(1, {
              duration: imgTransitionDuration,
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
    return (prev.source as any).uri === (next.source as any).uri
  }
)
