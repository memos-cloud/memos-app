import React, { FC, memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Fonts } from '../@types/fonts'
import { useStoreState } from '../@types/typedHooks'
import { formatVideoDuration } from '../utils/formatVideoDuration'
import { MyText } from './MyText'
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
      {item.duration && (
        <MyText customStyles={styles.videoText}>
          {formatVideoDuration(item.duration)}
        </MyText>
      )}
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

const styles = StyleSheet.create({
  videoText: {
    fontSize: 10,
    fontFamily: Fonts['Poppins-bold'],
    lineHeight: 16,
    padding: 6,
    paddingVertical: 3,
    marginRight: 10 - 2,
    marginBottom: 12 - 2,
    marginTop: 12,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
})

export default memo(AlbumFile, (prev, next) => prev.item.id === next.item.id)
