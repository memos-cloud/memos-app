import * as MediaLibrary from 'expo-media-library'
import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native'
import 'react-native-get-random-values'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery, useQueryClient } from 'react-query'
import { HomeNavProps } from '../@types/NavProps'
import { AssetsList } from '../components/AssetsList'
import Container from '../components/Container'
import { colors } from '../config/colors'
import { constantlyAskingForFilesPermission } from '../utils/getFilesPermision'
import { getVideoThumbnail } from '../utils/getVideoThumbnail'
import { resizeImage } from '../utils/resizeImage'

const widthAndHeight = (Dimensions.get('window').width - 10 * 4) / 3

const getAssets = async ({ albumId }: { albumId: string }) => {
  await constantlyAskingForFilesPermission()
  try {
    const options: MediaLibrary.AssetsOptions = {
      first: 50,
      sortBy: 'default',
      mediaType: [MediaLibrary.MediaType.video, MediaLibrary.MediaType.photo],
    }

    if (albumId !== 'kmdsam7138d1@E!2ioejwjdauds') options.album = albumId

    const data = await MediaLibrary.getAssetsAsync(options)

    const optimizPromises = data.assets.map((asset) => {
      if (asset.mediaType === 'photo') {
        return resizeImage(asset, {
          width: widthAndHeight,
        })
      } else if (asset.mediaType === 'video') {
        return getVideoThumbnail(asset, {
          width: widthAndHeight,
        })
      }
    })

    const optimized = await Promise.all(optimizPromises)

    return optimized
  } catch (error) {
    console.log(error)
  }
}

const PickImages = ({
  navigation,
  route: { params },
}: HomeNavProps<'AddFiles'>) => {
  const queryClient = useQueryClient()
  const {
    data: assets,
    isLoading: assetsLoading,
    error,
  } = useQuery(
    ['DeviceAssets', params.deviceAlbumId],
    () => getAssets({ albumId: params.deviceAlbumId }),
    {
      staleTime: 0,
    }
  )

  return (
    <Container customStyles={{ padding: 0 }}>
      {assetsLoading && (
        <ActivityIndicator
          style={{ padding: 12 }}
          size='small'
          color={colors.primary}
        />
      )}
      {assets && (
        <AssetsList
          albumTitle={params?.albumTitle ? params?.albumTitle : 'All Photos'}
          albumId={params?.albumId}
          openModal={() => {
            navigation.navigate('ChooseAlbumsScreen', {
              albumId: params.albumId,
            })
          }}
          goBack={() => navigation.goBack()}
          navigation={navigation}
          assets={assets}
          // getAssets={() => getAssets()}
          widthAndHeight={widthAndHeight}
        />
      )}
    </Container>
  )
}

export default PickImages

const styles = StyleSheet.create({})
