import { TouchableOpacity } from '@gorhom/bottom-sheet'
import React, { FC, memo, useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  findNodeHandle,
  StyleSheet,
  ToastAndroid,
  UIManager,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { useQuery, useQueryClient } from 'react-query'
import { AppNavProps, HomeNavProps } from '../@types/NavProps'
import { useStoreState } from '../@types/typedHooks'
import { getAlbumById } from '../api/getAlbumById'
import { getAlbumFiles } from '../api/getAlbumFiles'
import { getAlbums } from '../api/getAlbums'
import { updateAlbum } from '../api/updateAlbum'
import { AddFiles } from '../components/AddFiles'
import AlbumFile from '../components/AlbumFile'
import { ThreeDots } from '../components/icons/ThreeDots'
import { MyText } from '../components/MyText'
import { RefreshControlComponent } from '../components/RefreshControl'
import { SmoothFastImage } from '../components/SmoothFastImage'
import { v4 as uuidv4 } from 'uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AllPhotosId } from '../constants/serverURL'

const fileWidth = Dimensions.get('window').width / 4 - 7 * 2

const MemoizedAlbumFile = memo(
  ({ addFilesHandler }: { addFilesHandler: any }) => {
    return <AddFiles width={fileWidth} addFilesHandler={addFilesHandler} />
  },
)

const AlbumFilesScreen = ({ navigation, route }: AppNavProps<'AlbumFiles'>) => {
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)
  const { data: fetchedAlbums } = useQuery('albums', () => getAlbums())
  const [hasMore, setHasMore] = useState(false)

  const albumId = route.params.id

  const albumData = !fetchedAlbums
    ? []
    : fetchedAlbums.find(({ album }: any) => album.id === albumId)

  const { data, isLoading, error } = useQuery(
    `albumFiles:${albumId}`,
    () => getAlbumFiles(albumId),
    { staleTime: 1000 * 60 * 10 },
  )

  const onRefresh = async () => {
    const newAlbum = await getAlbumById(albumId)
    newAlbum.album.id = newAlbum.album._id
    delete newAlbum.album._id

    const newAlbums = (fetchedAlbums || []).map((albumData: any) => {
      if (albumId === albumData.album.id) {
        return newAlbum
      }
      return albumData
    })

    queryClient.setQueryData(`albums`, newAlbums)
    queryClient.setQueryData(
      `albumFiles:${albumId}`,
      await getAlbumFiles(albumId),
    )
    setRefreshing(false)
  }

  const addFilesHandler = () => {
    navigation.navigate('AddFiles', {
      albumId: route.params.id,
      deviceAlbumId: AllPhotosId,
    })
  }
  const colors = useStoreState((state) => state.theme)

  const optionsRef = useRef(null)

  const openOptionsHandler = () => {
    if (optionsRef.current) {
      UIManager.showPopupMenu(
        findNodeHandle(optionsRef.current) as any,
        ['Edit Album', 'Default Album Cover', 'Delete Album'],
        () => alert('something went wrong with the popup menu'),
        async (item, index) => {
          switch (index) {
            case 0:
              navigation.navigate('NewAlbum', {
                albumName: albumData.album.name,
                albumId: albumData.album.id,
              })
              break
            case 1:
              ToastAndroid.show('Progressing...', ToastAndroid.SHORT)
              await updateAlbum({ AlbumFileId: 'default' }, albumId)

              ToastAndroid.show(
                'Album Cover set to Default',
                ToastAndroid.SHORT,
              )

              await AsyncStorage.setItem(
                `album:${albumId}:albumCover`,
                'default',
              )

              const newAlbums = fetchedAlbums!.map((e: any) => {
                if (e.album.id === albumId) {
                  return {
                    ...e,
                    albumCover: data[1],
                  }
                }
                return e
              })

              queryClient.setQueryData('albums', newAlbums)

              break
            case 2:
              navigation.navigate('ConfirmationModal', {
                title: 'Are you sure you want to Delete this Album?',
                actionType: 'deleteAlbum',
                deleteId: albumId,
              })
              break
          }
        },
      )
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={colors.activeOpacity}
          ref={optionsRef}
          onPress={openOptionsHandler}
          style={{ padding: 9, paddingRight: 4.5 }}
        >
          <ThreeDots size={18} />
        </TouchableOpacity>
      ),
    })
  }, [])

  const onEndReachHandler = async () => {
    const hasMore = queryClient.getQueryData(`albumFiles:${albumId}:hasMore`)
    if (hasMore) {
      setHasMore(true)
      // Fetch next 30 Albums
      queryClient.setQueryData(`albumFiles:${albumId}`, [
        ...(data || []),
        ...(await getAlbumFiles(albumId, (data || []).length)),
      ])
    } else {
      setHasMore(false)
    }
  }

  return (
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
            <SmoothFastImage
              style={[styles.albumCover, styles.parent]}
              uri={albumData?.albumCover?.fileURL}
              loadFirst={albumData?.albumCover?.deviceFileUrl}
              id={albumData?.albumCover?.id}
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
              size="lg"
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
        4 - ((data || []).length % 4)
          ? [
              ...(data || []),
              ...[
                ...Array(
                  4 - ((data || []).length % 4) !== 4
                    ? 4 - ((data || []).length % 4)
                    : 0,
                ),
              ].map(() => ({
                fileURL: 'empty',
              })),
            ]
          : data || []
      }
      keyExtractor={(item) => item.id}
      onEndReached={onEndReachHandler}
      onEndReachedThreshold={1}
      ListFooterComponent={
        hasMore ? (
          <ActivityIndicator
            style={{ paddingVertical: 8 }}
            size="small"
            color={colors.primary}
          />
        ) : undefined
      }
      contentContainerStyle={{ paddingBottom: 6 }}
    />
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
