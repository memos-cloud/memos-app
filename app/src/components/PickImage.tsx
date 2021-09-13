import { addSeconds, format } from 'date-fns'
import * as MediaLibrary from 'expo-media-library'
import _ from 'lodash'
import React, { FC, memo, useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Fonts } from '../@types/fonts'
import { useStoreState } from '../@types/typedHooks'
import { MyText } from './MyText'

function formattedTime(seconds: number) {
  var helperDate = addSeconds(new Date(0), seconds)
  return format(helperDate, 'm:ss')
}

interface Props {
  item: MediaLibrary.Asset
  widthAndHeight: number
  selected: string[]
  selectHandler: any
}

const PickImage: FC<Props> = ({
  item,
  widthAndHeight,
  selected,
  selectHandler,
}) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <TouchableWithoutFeedback
      onPress={() => selectHandler(item.id)}
      style={{
        width: widthAndHeight,
        height: widthAndHeight,
        borderRadius: 15,
        overflow: 'hidden',
        marginTop: 10,
      }}
    >
      <Image
        source={{ uri: item.uri }}
        style={{
          width: widthAndHeight,
          height: widthAndHeight,
          marginBottom: 4,
        }}
      />
      <View
        style={
          !!(selected.findIndex((e) => e === item.id) + 1)
            ? [
                styles.selectionOverlay,
                {
                  borderColor: colors.white,
                },
              ]
            : {}
        }
      >
        <MyText
          customStyles={
            !!(selected.findIndex((e) => e === item.id) + 1)
              ? {
                  transform: [{ translateY: 3 }],
                  fontSize: 28,
                }
              : {}
          }
        >
          {!!(selected.findIndex((e) => e === item.id) + 1) &&
            selected.findIndex((e) => e === item.id) + 1}
        </MyText>
      </View>

      {item.mediaType === 'video' && (
        <MyText customStyles={styles.videoText}>
          {formattedTime(item.duration)}
        </MyText>
      )}
    </TouchableWithoutFeedback>
  )
}

const memoizedPickImage = memo(PickImage, (prev, next) => {
  const nextSelected = next.selected.find((e) => e === next.item.id)
  const prevSelected = prev.selected.find((e) => e === prev.item.id)

  if (
    (nextSelected && !prevSelected) ||
    (!nextSelected && prevSelected) ||
    (prevSelected && nextSelected && !_.isEqual(prev.selected, next.selected))
  ) {
    return false
  }

  return true
})

export { memoizedPickImage as PickImage }

const styles = StyleSheet.create({
  videoText: {
    fontSize: 12,
    fontFamily: Fonts['Poppins-bold'],
    lineHeight: 16,
    padding: 6,
    paddingVertical: 3,
    marginRight: 12 - 2,
    marginBottom: 12 - 2,
    marginTop: 12,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  selectionOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 2,
    borderRadius: 15,
  },
})
