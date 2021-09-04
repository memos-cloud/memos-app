import React, { FC, memo } from 'react'
import { View } from 'react-native'
import { colors } from '../config/colors'
import { SmoothFastImage } from './SmoothFastImage'

interface Props {
  item: any
  width: number
}

const AlbumFile: FC<Props> = ({ item, width }) => {
  return item.fileURL !== 'empty' ? (
    <SmoothFastImage
      source={{ uri: item.fileURL }}
      resizeMode='cover'
      style={{
        width: width,
        height: width,
        borderRadius: 10,
        marginBottom: 7,
        borderColor: colors.borderColor,
        borderWidth: 1.5,
      }}
      id={item.id}
    />
  ) : (
    <View
      style={{
        width: width,
        height: width,
        borderRadius: 10,
        marginBottom: 7,
        borderColor: 'transparent',
        borderWidth: 1.5,
      }}
    />
  )
}

export default memo(
  AlbumFile,
  (prev, next) => prev.item.fileURL === next.item.fileURL
)
