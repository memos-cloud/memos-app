import * as Constants from 'expo-constants'
import * as MediaLibrary from 'expo-media-library'
import React from 'react'
import { ActivityIndicator, Dimensions } from 'react-native'
import { useQuery } from 'react-query'
import { AppNavProps } from '../@types/NavProps'
import { useStoreState } from '../@types/typedHooks'
import { AssetsList } from '../components/AssetsList'
import Container from '../components/Container'
import { askingForFilesPermission } from '../utils/getFilesPermision'
import * as Sentry from 'sentry-expo'
import { AllPhotosId } from '../constants/serverURL'

const widthAndHeight = (Dimensions.get('window').width - 10 * 4) / 3

interface GetAssetsProps {
  first?: number
  albumId: string
  after?: string
}
const getAssets = async ({ first, albumId, after }: GetAssetsProps) => {
  const granted = await askingForFilesPermission()

  if (!granted) {
    return []
  }
  const options: MediaLibrary.AssetsOptions = {
    first: first || 100,
    sortBy: 'creationTime',
    after,
    mediaType: [MediaLibrary.MediaType.video, MediaLibrary.MediaType.photo],
  }

  if (albumId !== AllPhotosId) options.album = albumId

  const data = await MediaLibrary.getAssetsAsync(options)

  return data.assets
}

const PickImages = ({
  navigation,
  route: { params },
}: AppNavProps<'AddFiles'>) => {
  const { data: assets, isLoading: assetsLoading } = useQuery(
    ['DeviceAssets', params.deviceAlbumId],
    () => getAssets({ albumId: params.deviceAlbumId }),
    {
      staleTime: 0,
    },
  )

  const colors = useStoreState((state) => state.theme)

  return (
    <Container customStyles={{ padding: 0 }}>
      {assetsLoading && (
        <ActivityIndicator
          style={{
            padding: Constants.default.statusBarHeight + 6,
          }}
          size="small"
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
