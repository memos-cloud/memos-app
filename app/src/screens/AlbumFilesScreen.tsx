import { TouchableOpacity } from '@gorhom/bottom-sheet'
import React, { FC, memo, useCallback, useRef, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import {
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { useQuery, useQueryClient } from 'react-query'
import { HomeNavProps } from '../@types/NavProps'
import { useStoreState } from '../@types/typedHooks'
import { getAlbumById } from '../api/getAlbumById'
import { getAlbumFiles } from '../api/getAlbumFiles'
import { AddFiles } from '../components/AddFiles'
import AlbumFile from '../components/AlbumFile'
import Container from '../components/Container'
import { ThreeDots } from '../components/icons/ThreeDots'
import { MyText } from '../components/MyText'
import { RefreshControlComponent } from '../components/RefreshControl'
import { SmoothFastImage } from '../components/SmoothFastImage'
import OptionsMenu from 'react-native-option-menu'
import { UIManager, findNodeHandle } from 'react-native'

interface AlbumFilesCoverProps {
  fileURL: string
  deviceFileUrl: string
  Key: string
}

const fileWidth = Dimensions.get('screen').width / 4 - 7 * 2

const AlbumFilesCover: FC<AlbumFilesCoverProps> = memo(
  ({ fileURL, deviceFileUrl }) => {
    return (
      <SmoothFastImage
        style={[styles.albumCover, styles.parent]}
        uri={fileURL}
        loadFirst={deviceFileUrl}
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
  const colors = useStoreState((state) => state.theme)

  const optionsRef = useRef(null)

  const openOptionsHandler = () => {
    if (optionsRef.current) {
      UIManager.showPopupMenu(
        findNodeHandle(optionsRef.current) as any,
        ['Edit Album', 'Default Album Cover to Latest', 'Delete Album'],
        () => console.log('something went wrong with the popup menu'),
        (item, index) => {
          console.log(index)
          switch (index) {
            case 0:
              navigation.navigate('NewAlbum', {
                albumName: albumData.album.name,
                albumId: albumData.album.id,
              })
              break
            case 1:
              break
            case 2:
              navigation.navigate('ConfirmationModal', {
                title: 'Are you sure you want to Delete this Album?',
                actionType: 'deleteAlbum',
                deleteId: albumId,
              })
              break
          }
        }
      )
    }
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
                  Key={albumData?.albumCover?.id}
                  fileURL={albumData?.albumCover?.fileURL}
                  deviceFileUrl={albumData?.albumCover?.deviceFileUrl}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                >
                  <TouchableOpacity
                    ref={optionsRef}
                    onPress={openOptionsHandler}
                    style={{ padding: 16 }}
                  >
                    <ThreeDots size={20} />
                  </TouchableOpacity>
                </View>
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
          renderItem={({ item, index }) => {
            if (item.placeholder) {
              return <MemoizedAlbumFile addFilesHandler={addFilesHandler} />
            }
            return (
              <AlbumFile
                previewHandler={() =>
                  navigation.navigate('AssetsPreview', {
                    albumId: route.params.id,
                    index,
                  })
                }
                item={item}
                width={fileWidth}
              />
            )
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
