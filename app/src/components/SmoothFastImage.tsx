import React, { FC, memo, useEffect, useState } from 'react'
import { ImageStyle, StyleProp, Image as PureImage } from 'react-native'
import { Image } from 'react-native-expo-image-cache'

interface Props {
  style: StyleProp<ImageStyle>
  uri: string
  id?: string
  loadFirst?: string
  transitionDuration?: number
}

export const SmoothFastImage: FC<Props> = memo(
  ({ uri, style, loadFirst, transitionDuration }) => {
    const [imgSource, setImgSource] = useState(!!loadFirst)

    return imgSource ? (
      <PureImage
        style={style}
        source={{ uri: loadFirst }}
        onError={() => setImgSource(false)}
      />
    ) : (
      <Image transitionDuration={transitionDuration} style={style} uri={uri} />
    )
  },
  (prev, next) => {
    if (prev.id) {
      return prev.id === next.id
    }
    return prev.uri === next.uri
  }
)
