import { StackNavigationProp } from '@react-navigation/stack'
import * as MediaLibrary from 'expo-media-library'
import _ from 'lodash'
import React, { memo, useEffect, useState } from 'react'
import { useRef } from 'react'
import { FlatList } from 'react-native'
import { useQueryClient } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { HomeStackParamList } from '../@types/StackParamList'
import { uploadAssets } from '../api/uploadAssets'
import { colors } from '../config/colors'
import { PickImage } from './PickImage'
import { UploadHeader } from './UploadHeader'

interface Props {
  navigation: StackNavigationProp<HomeStackParamList, 'AddFiles'>
  albumId: string
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
}

const AssetsFlatList = ({
  assets,
  widthAndHeight,
  openModal,
  albumTitle,
  goBack,
  albumId,
  navigation,
}: Props) => {
  const queryClient = useQueryClient()
  const [selected, setSelected] = useState<string[]>([])

  const selectHandler = (id: string) => {
    setSelected((selected) => {
      const isSelected = selected.find((e) => e === id)

      if (isSelected) {
        return selected.filter((e) => e !== id)
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
      uploadAssets(albumId, asset.originalURI, {
        notification: !index,
      })
    })

    // Set new Album Cover
    const albums = queryClient.getQueryData('albums') as any
    const newAlbums = albums.map((albumData: any) => {
      if (albumId === albumData.album.id) {
        const photoAssets = assets.filter(
          (asset) => asset?.mediaType === 'photo'
        )
        const asset = photoAssets[photoAssets.length - 1]

        return {
          ...albumData,
          albumCover: {
            id: uuidv4(),
            mimetype: asset?.mediaType,
            fileURL: asset!.uri,
            createdAt: Date.now(),
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
          fileURL: asset.originalURI,
          createdAt: new Date(),
        }
      }),
      ...albumFiles.filter((e: any) => !e.placeholder),
    ]

    await queryClient.setQueryData(`albumFiles:${albumId}`, newAlbumFiles)

    navigation.navigate('AlbumFiles', { id: albumId })
  }

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <UploadHeader
          albumTitle={albumTitle}
          disableChoosingAlbums={selected.length > 0}
          goBack={goBack}
          openModal={openModal}
          uploadAssetsHandler={uploadAssetsHandler}
        />
      ),
    })
  }, [albumTitle, selected.length])

  return (
    <FlatList
      removeClippedSubviews={true}
      contentContainerStyle={{
        minHeight: '100%',
      }}
      getItemLayout={(data, index) => ({
        length: widthAndHeight,
        offset: widthAndHeight * index,
        index,
      })}
      initialNumToRender={20}
      style={{ backgroundColor: colors.black, flex: 1 }}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: colors.borderColor,
      }}
      numColumns={3}
      renderItem={renderItem}
      // onEndReached={async () => {
      //   await getAssets({ first: 100, after: assets[assets.length - 1].id })
      // }}
      onEndReachedThreshold={0.5}
      keyExtractor={(item) => item!.id}
      data={assets}
    />
  )
}

const memoized = memo(AssetsFlatList, (prev, next) => {
  if (!_.isEqual(prev.assets, next.assets)) {
    return false
  }
  return true
})

export { memoized as AssetsList }
