import React from 'react'
import { memo } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { useStoreState } from '../state-management/typedHooks'
import { MyText } from './MyText'

interface Props {
  item: {
    id: string
    assetCount: number
    albumCover: {
      id: string
      uri: string
      width: number
      height: number
      base64?: string | undefined
    } | null
    endTime: number
    startTime: number
    title: string
  }
  setAlbums: any
}

const AlbumRenderItem = ({ item, setAlbums }: Props) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <TouchableOpacity
      onPress={setAlbums}
      activeOpacity={colors.activeOpacity}
      style={{
        width: '100%',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      <Image
        style={{
          width: 65,
          height: 65,
          borderRadius: 8,
          backgroundColor: item.albumCover ? 'transparent' : colors.secondary,
        }}
        source={
          !item.albumCover
            ? require('../assets/Images/no_photo.png')
            : {
                uri: item.albumCover.uri,
              }
        }
      />
      <View
        style={{
          paddingLeft: 15,
        }}
      >
        <MyText>{item.title}</MyText>
        <MyText
          numberOfLines={1}
          size="xs"
          customStyles={{ color: '#808080', maxWidth: '90%' }}
        >
          {item.assetCount}
        </MyText>
      </View>
    </TouchableOpacity>
  )
}

const memoised = memo(AlbumRenderItem, (prev, next) => {
  if (
    prev.item.id !== next.item.id ||
    prev.item.albumCover?.id !== next.item.albumCover?.id
  ) {
    return false
  }
  return true
})

export { memoised as AlbumRenderItem }
