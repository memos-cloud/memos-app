import * as MediaLibrary from 'expo-media-library'
import React from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { useQuery } from 'react-query'
import { AppNavProps } from '../@types/NavProps'
import { useStoreState } from '../@types/typedHooks'
import { AlbumRenderItem } from '../components/ChooseAlbum'
import Container from '../components/Container'
import { AllPhotosId } from '../constants/serverURL'
import { askingForFilesPermission } from '../utils/getFilesPermision'

const getDeviceAlbums = async () => {
  const granted = await askingForFilesPermission()
  if (!granted) {
    return []
  }
  const albums = (await MediaLibrary.getAlbumsAsync()).sort(
    (a, b) => b.assetCount - a.assetCount,
  )

  const firstAsset = await MediaLibrary.getAssetsAsync({
    first: 1,
    sortBy: 'creationTime',
  })
  const allAlbums = {
    id: AllPhotosId,
    assetCount: firstAsset.totalCount,
    albumCover: firstAsset.assets[0],
    endTime: 999999999,
    startTime: 2132131,
    title: 'All Photos',
  }

  const albumsWithCovers = albums.map(async (album) => {
    const albumCover = await MediaLibrary.getAssetsAsync({
      first: 1,
      album: album.id,
      sortBy: 'creationTime',
    })

    return {
      ...album,
      albumCover: albumCover ? albumCover.assets[0] : null,
    }
  })
  const newAlbums = await Promise.all(albumsWithCovers)

  return [allAlbums, ...newAlbums]
}

export const ChooseAlbumsScreen = ({
  navigation,
  route: { params },
}: AppNavProps<'ChooseAlbumsScreen'>) => {
  const { data: albums, isLoading } = useQuery(
    'DeviceAlbums',
    getDeviceAlbums,
    { staleTime: 0 },
  )

  const setAlbums = (item: any) => () => {
    navigation.navigate('AddFiles', {
      deviceAlbumId: item.title === 'All Photos' ? AllPhotosId : item.id,
      albumTitle: item.title,
      albumId: params.albumId,
    })
  }

  const colors = useStoreState((state) => state.theme)

  return (
    <Container
      customStyles={{
        backgroundColor: colors.black,
        padding: 0,
      }}
    >
      {isLoading && (
        <ActivityIndicator
          style={{
            padding: 20,
          }}
          size="small"
          color={colors.primary}
        />
      )}
      {albums && (
        <FlatList
          initialNumToRender={20}
          contentContainerStyle={{
            paddingVertical: 20,
          }}
          data={albums}
          renderItem={({ item }) => (
            <AlbumRenderItem item={item} setAlbums={setAlbums(item)} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </Container>
  )
}
