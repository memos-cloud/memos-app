import React, { FC, memo } from 'react'
import { View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useStoreState } from '../@types/typedHooks'
import { SmoothFastImage } from './SmoothFastImage'

interface Props {
  item: any
  width: number
  previewHandler: () => void
}

const AlbumFile: FC<Props> = ({ item, width, previewHandler }) => {
  const colors = useStoreState((state) => state.theme)

  return item.fileURL !== 'empty' ? (
    <TouchableWithoutFeedback onPress={previewHandler}>
      <SmoothFastImage
        uri={item.fileURL}
        loadFirst={item.deviceFileUrl}
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
    </TouchableWithoutFeedback>
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
