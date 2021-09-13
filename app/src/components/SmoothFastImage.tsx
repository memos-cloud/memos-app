import * as FileSystem from 'expo-file-system'
import React, { FC, memo, useEffect, useState } from 'react'
import {
  Image as PureImage,
  ImageResizeMode,
  ImageStyle,
  StyleProp,
  View,
} from 'react-native'
import { Image } from 'react-native-expo-image-cache'

interface Props {
  style?: StyleProp<ImageStyle>
  uri: string
  id?: string
  loadFirst?: string
  transitionDuration?: number
  resizeMode?: ImageResizeMode
}

export const SmoothFastImage: FC<Props> = memo(
  ({ uri, style, loadFirst, transitionDuration, resizeMode }) => {
    const [loadFromDisk, setLoadFromDisk] = useState(!!loadFirst)
    const [imgResult, setImgResult] = useState(false)

    useEffect(() => {
      const checkImage = async () => {
        if (loadFirst) {
          const { exists } = await FileSystem.getInfoAsync(loadFirst)
          setLoadFromDisk(exists)
        }

        setImgResult(true)
      }
      checkImage()
    }, [])

    if (!imgResult) {
      return <View style={style} />
    }

    return loadFromDisk ? (
      <PureImage
        resizeMode={resizeMode}
        style={style}
        source={{ uri: loadFirst }}
        onError={() => setLoadFromDisk(false)}
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
