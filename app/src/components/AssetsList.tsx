import { StackNavigationProp } from '@react-navigation/stack'
import * as MediaLibrary from 'expo-media-library'
import _ from 'lodash'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { useQueryClient } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { HomeStackParamList } from '../@types/StackParamList'
import { useStoreState } from '../@types/typedHooks'
import { uploadAssets } from '../api/uploadAssets'
import { ArrowIcon } from './icons/Arrow'
import { DropDownArrow } from './icons/DropDownArrow'
import { MyText } from './MyText'
import { PickImage } from './PickImage'
import * as Constants from 'expo-constants'

interface Props {
  navigation: StackNavigationProp<HomeStackParamList, 'AddFiles'>
  albumId: string
  deviceAlbumId: string
  widthAndHeight: number
  assets: (
    | {
        uri: string
        id: string
        filename: string
        mediaType: MediaLibrary.MediaTypeValue
        mediaSubtypes?: string[] | undefined
        width: number
        height: number
        creationTime: number
        modificationTime: number
        duration: number
        albumId?: string | undefined
      }
    | undefined
  )[]
  openModal: any
  goBack: any
  albumTitle: string
  getAssets: ({
    albumId,
    after,
    first,
  }: {
    first?: number
    albumId: string
    after?: any
  }) => Promise<MediaLibrary.Asset[] | undefined>
}

const AssetsFlatList = ({
  assets,
  widthAndHeight,
  openModal,
  albumTitle,
  goBack,
  albumId,
  deviceAlbumId,
  navigation,
  getAssets,
}: Props) => {
  const queryClient = useQueryClient()
  const [selected, setSelected] = useState<string[]>([])

  const selectHandler = (id: string) => {
    setSelected((selected) => {
      console.log(selected.length)
      const isSelected = selected.find((e) => e === id)

      if (isSelected) {
        return selected.filter((e) => e !== id)
      }

      if (selected.length >= 15) {
        ToastAndroid.show(
          "Can't save more than 15 assets at a time!",
          ToastAndroid.BOTTOM
        )
        return selected
      }
      return [...selected, id]
    })
  }

  const renderItem = ({ item }: { item: any }) => (
    <PickImage
      item={item}
      selected={selected}
      widthAndHeight={widthAndHeight}
      selectHandler={selectHandler}
    />
  )

  const uploadAssetsHandler = async () => {
    const newFiles: any[] = []

    selected.map((id, index) => {
      const asset: any = assets.find((asset) => asset?.id === id)
      newFiles.push(asset)

      uploadAssets(albumId, asset.uri)
    })

    // Set new Album Cover
    const albums = queryClient.getQueryData('albums') as any

    const newAlbums = albums.map((albumData: any) => {
      if (albumId === albumData.album.id) {
        const photoAssets = assets.filter(
          (asset) =>
            asset?.mediaType === 'photo' && selected.find((e) => e === asset.id)
        )
        const asset = photoAssets[photoAssets.length - 1]

        return {
          ...albumData,
          albumCover: {
            id: uuidv4(),
            mimetype: asset?.mediaType,
            deviceFileUrl: asset!.uri,
            createdAt: new Date().toISOString(),
          },
        }
      }
      return albumData
    })
    await queryClient.setQueryData(`albums`, newAlbums)

    // Add new Files to the album
    const albumFiles = queryClient.getQueryData(`albumFiles:${albumId}`) as any
    const newAlbumFiles = [
      { placeholder: 'addFiles' },
      ...newFiles.map((asset) => {
        return {
          id: uuidv4(),
          mimetype: asset.mimetype === 'photo' ? 'image/png' : 'video/mp3',
          deviceFileUrl: asset.uri,
          createdAt: new Date().toISOString(),
        }
      }),
      ...albumFiles.filter((e: any) => !e.placeholder),
    ]

    await queryClient.setQueryData(`albumFiles:${albumId}`, newAlbumFiles)

    navigation.navigate('AlbumFiles', { id: albumId })
  }

  const [chooseAlbumsDisabled, setChooseAlbumsDisabled] = useState(false)
  const lastAlbumTitle = useRef(albumTitle)

  useEffect(() => {
    if (
      (selected.length && !chooseAlbumsDisabled) ||
      (!selected.length && chooseAlbumsDisabled)
    ) {
      if (albumTitle !== lastAlbumTitle.current) {
        lastAlbumTitle.current = albumTitle
      }
      setChooseAlbumsDisabled(selected.length > 0)
    }
  }, [albumTitle, selected.length])

  const colors = useStoreState((state) => state.theme)

  const onEndReachHandler = async () => {
    const newAssets = await getAssets({
      albumId: deviceAlbumId,
      after: assets.length.toString(),
    })

    queryClient.setQueryData(['DeviceAssets', deviceAlbumId], () => {
      return [...assets, ...(newAssets || [])]
    })
  }

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: colors.secondary,
          borderWidth: 1,
          borderBottomColor: colors.borderColor,
          paddingTop: Constants.default.statusBarHeight,
        }}
      >
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: colors.secondary,
            alignItems: 'center',
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 12,
              paddingLeft: 20,
            }}
            activeOpacity={colors.activeOpacity}
            onPress={goBack}
          >
            <ArrowIcon width={21} />
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: -1,
            }}
          >
            <TouchableOpacity
              disabled={selected.length > 0}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={openModal}
              activeOpacity={colors.activeOpacity}
            >
              <MyText
                numberOfLines={1}
                customStyles={{
                  textAlign: 'center',
                  paddingVertical: 16,
                  marginRight: 6,
                  maxWidth: Dimensions.get('screen').width / 2.8,
                  opacity: selected.length > 0 ? 0.6 : 1,
                }}
              >
                {albumTitle}
              </MyText>
              <DropDownArrow
                width={15}
                fill={
                  selected.length > 0
                    ? 'rgba(255, 255, 255, 0.6)'
                    : colors.white
                }
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={!(selected.length > 0)}
            onPress={uploadAssetsHandler}
            style={{
              paddingRight: 20,
            }}
            activeOpacity={colors.activeOpacity}
          >
            <MyText
              customStyles={{
                color: colors.primary,
                opacity: !(selected.length > 0) ? 0.6 : 1,
              }}
            >
              Upload
            </MyText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <FlatList
        contentContainerStyle={{
          minHeight: '100%',
        }}
        initialNumToRender={20}
        getItemLayout={(data, index) => ({
          length: widthAndHeight,
          offset: widthAndHeight * index,
          index,
        })}
        style={{ backgroundColor: colors.borderColor, flex: 1 }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
        numColumns={3}
        renderItem={renderItem}
        onEndReached={onEndReachHandler}
        onEndReachedThreshold={2}
        keyExtractor={(item) => item!.id}
        data={assets}
      />
    </>
  )
}

const memoized = memo(AssetsFlatList, (prev, next) => {
  if (!_.isEqual(prev.assets, next.assets)) {
    return false
  }
  return true
})

export { memoized as AssetsList }
