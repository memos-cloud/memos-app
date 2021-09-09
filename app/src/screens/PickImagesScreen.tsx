import * as Constants from 'expo-constants'
import * as MediaLibrary from 'expo-media-library'
import React from 'react'
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native'
import 'react-native-console-time-polyfill'
import 'react-native-get-random-values'
import { useQuery, useQueryClient } from 'react-query'
import { HomeNavProps } from '../@types/NavProps'
import { useStoreState } from '../@types/typedHooks'
import { AssetsList } from '../components/AssetsList'
import Container from '../components/Container'
import { askingForFilesPermission } from '../utils/getFilesPermision'

const widthAndHeight = (Dimensions.get('window').width - 10 * 4) / 3

const getAssets = async ({
  first,
  albumId,
  after,
}: {
  first?: number
  albumId: string
  after?: string
}) => {
  const granted = await askingForFilesPermission()

  if (!granted) {
    return
  }
  try {
    const options: MediaLibrary.AssetsOptions = {
      first: first ? first : 100,
      sortBy: 'default',
      after,
      mediaType: [MediaLibrary.MediaType.video, MediaLibrary.MediaType.photo],
    }

    if (albumId !== 'kmdsam7138d1@E!2ioejwjdauds') options.album = albumId

    const data = await MediaLibrary.getAssetsAsync(options)

    return data.assets
  } catch (error) {}
}

const PickImages = ({
  navigation,
  route: { params },
}: HomeNavProps<'AddFiles'>) => {
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

  const colors = useStoreState((state) => state.theme)

  return (
    <Container customStyles={{ padding: 0 }}>
      {assetsLoading && (
        <ActivityIndicator
          style={{
            padding: 12,
          }}
          size='small'
          color={colors.primary}
        />
      )}
      {assets && (
        <AssetsList
          albumTitle={params?.albumTitle ? params?.albumTitle : 'All Photos'}
          albumId={params?.albumId}
          deviceAlbumId={params?.deviceAlbumId}
          openModal={() => {
            navigation.navigate('ChooseAlbumsScreen', {
              albumId: params.albumId,
            })
          }}
          goBack={() => navigation.goBack()}
          navigation={navigation}
          assets={assets}
          widthAndHeight={widthAndHeight}
          getAssets={getAssets}
        />
      )}
    </Container>
  )
}

export default PickImages

const styles = StyleSheet.create({})
