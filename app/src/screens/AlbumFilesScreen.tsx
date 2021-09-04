import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import {
  Dimensions,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useQuery, useQueryClient } from 'react-query'
import { HomeNavProps } from '../@types/NavProps'
import { getAlbumById } from '../api/getAlbumById'
import { getAlbumFiles } from '../api/getAlbumFiles'
import { AddFiles } from '../components/AddFiles'
import { AddIcon } from '../components/AddIcon'
import AlbumFile from '../components/AlbumFile'
import Container from '../components/Container'
import { MyHeader } from '../components/Header'
import { MyText } from '../components/MyText'
import { RefreshControlComponent } from '../components/RefreshControl'
import { colors } from '../config/colors'

interface AlbumFilesCoverProps {
  fileURL: string
  Key: string
}

const fileWidth = Dimensions.get('screen').width / 4 - 7 * 2

const AlbumFilesCover: FC<AlbumFilesCoverProps> = memo(
  ({ fileURL }) => {
    return (
      <Image
        style={[styles.albumCover, styles.parent]}
        source={{ uri: fileURL }}
      />
    )
  },
  (prev, next) => {
    return prev.Key === next.Key
  }
)

const MemoizedAlbumFile = memo(
  ({ addFilesHandler }: { addFilesHandler: any }) => {
    return <AddFiles width={fileWidth} addFilesHandler={addFilesHandler} />
  }
)

const AlbumFilesScreen = ({
  navigation,
  route,
}: HomeNavProps<'AlbumFiles'>) => {
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)
  const fetchedAlbums = queryClient.getQueryData('albums') as any
  const albumId = route.params.id

  const albumData = fetchedAlbums.find(({ album }: any) => album.id === albumId)

  const { data, isLoading, error } = useQuery(`albumFiles:${albumId}`, () =>
    getAlbumFiles(albumId)
  )

  const onRefresh = useCallback(async () => {
    const newAlbum = await getAlbumById(albumId)
    newAlbum.album.id = newAlbum.album._id
    delete newAlbum.album._id

    const newAlbums = fetchedAlbums.map((albumData: any) => {
      if (albumId === albumData.album.id) {
        return newAlbum
      }
      return albumData
    })

    await queryClient.setQueryData(`albums`, newAlbums)
    await queryClient.setQueryData(
      `albumFiles:${albumId}`,
      await getAlbumFiles(albumId)
    )
    setRefreshing(false)
  }, [])

  const addFilesHandler = () => {
    navigation.navigate('AddFiles', {
      albumId: route.params.id,
      deviceAlbumId: 'kmdsam7138d1@E!2ioejwjdauds',
    })
  }

  return (
    <Container customStyles={{ padding: 0 }}>
      <Container
        customStyles={{
          flex: 0,
          padding: 0,
        }}
      >
        <FlatList
          ListHeaderComponent={
            <>
              <View
                style={{
                  backgroundColor: !albumData.albumCover
                    ? colors.secondary
                    : 'transparent',
                }}
              >
                <AlbumFilesCover
                  Key={albumData.albumCover?.key}
                  fileURL={albumData.albumCover?.fileURL}
                />
              </View>
              <View
                style={{
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  padding: 15,
                  paddingBottom: 0,
                }}
              >
                <MyText
                  customStyles={{
                    maxWidth: '85%',
                  }}
                  size='lg'
                >
                  {albumData.album.name}
                </MyText>
              </View>
            </>
          }
          refreshControl={
            <RefreshControlComponent
              refreshing={refreshing || isLoading}
              onRefresh={onRefresh}
            />
          }
          ListHeaderComponentStyle={{ width: '100%' }}
          contentContainerStyle={{
            flexDirection: 'column',
            flex: 1,
          }}
          numColumns={4}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            padding: 15,
            paddingTop: 0,
            paddingBottom: 0,
          }}
          renderItem={({ item }) => {
            if (item.placeholder) {
              return <MemoizedAlbumFile addFilesHandler={addFilesHandler} />
            }
            return <AlbumFile item={item} width={fileWidth} />
          }}
          data={
            (data || []).length % 4
              ? [
                  ...(data || []),
                  ...[...Array((data || []).length % 4)].map(() => ({
                    fileURL: 'empty',
                  })),
                ]
              : data || []
          }
          keyExtractor={(item) => item.id}
        />
      </Container>
    </Container>
  )
}

export default AlbumFilesScreen

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: 225,
    overflow: 'hidden',
  },
  touchable: {
    marginBottom: 8,
  },
  albumCover: {
    width: '100%',
    height: 200,
  },
  details: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  card: {
    width: '100%',
    height: '100%',
    padding: 15,
    justifyContent: 'flex-end',
  },
})
