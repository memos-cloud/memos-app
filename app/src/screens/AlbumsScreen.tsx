import { useScrollToTop } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { useQuery, useQueryClient } from 'react-query'
import { AppNavProps } from '../@types/NavProps'
import { useStoreState } from '../@types/typedHooks'
import { getAlbums } from '../api/getAlbums'
import Album from '../components/Album'
import { Center } from '../components/Center'
import Container from '../components/Container'
import { MyButton } from '../components/MyButton'
import { MyText } from '../components/MyText'
import { NoAlbums } from '../components/NoAlbums'
import { RefreshControlComponent } from '../components/RefreshControl'

interface Props extends AppNavProps<'HomeTabs'> {}

const AlbumsScreen = ({ navigation }: Props) => {
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)
  const { data, isLoading } = useQuery('albums', () => getAlbums())
  const [hasMore, setHasMore] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    queryClient.setQueryData('albums', await getAlbums())
    setRefreshing(false)
  }

  useEffect(() => {
    if (refreshing) {
      setRefreshing(true)
    } else {
      setRefreshing(false)
    }
  }, [isLoading])

  const flatListRef = useRef(null)

  useScrollToTop(flatListRef)

  const colors = useStoreState((state) => state.theme)

  const onEndReachHandler = async () => {
    const hasMore = queryClient.getQueryData('albums:hasMore')

    if (hasMore) {
      setHasMore(true)
      // Fetch next 10 Albums
      queryClient.setQueryData('albums', [
        ...(data || []),
        ...(await getAlbums((data || []).length)),
      ])
    } else {
      setHasMore(false)
    }
  }

  return (
    <Container
      customStyles={{
        padding: 0,
      }}
    >
      {data?.length ? (
        <FlatList
          ref={flatListRef}
          refreshControl={
            <RefreshControlComponent
              refreshing={refreshing || isLoading}
              onRefresh={onRefresh}
            />
          }
          ListHeaderComponent={
            <MyButton
              customStyles={{
                marginVertical: 10,
                marginHorizontal: 2,
                borderWidth: 2,
                borderColor: colors.primary,
              }}
              text="Create New Album"
              onPress={() => navigation.navigate('NewAlbum')}
              bg={colors.black}
              color={colors.primary}
            />
          }
          ListFooterComponent={
            hasMore ? (
              <ActivityIndicator
                style={{ paddingVertical: 8 }}
                size="small"
                color={colors.primary}
              />
            ) : undefined
          }
          contentContainerStyle={{ padding: 8, paddingTop: 0 }}
          data={data || []}
          renderItem={({ item }) => (
            <Album navigation={navigation} data={item} />
          )}
          onEndReached={onEndReachHandler}
          onEndReachedThreshold={1}
          keyExtractor={({ album }) => album.id}
        />
      ) : (
        data && (
          <ScrollView
            refreshControl={
              <RefreshControlComponent
                refreshing={refreshing || isLoading}
                onRefresh={onRefresh}
              />
            }
            contentContainerStyle={{ flex: 1 }}
          >
            <Center>
              <NoAlbums width={220} />
              <MyText customStyles={{ marginTop: 25 }}>
                You don’t have any Albums
              </MyText>

              <MyButton
                customStyles={{
                  borderRadius: 8,
                }}
                btnStyles={{
                  marginTop: 15,
                  paddingHorizontal: 17,
                  paddingVertical: 12,
                  borderRadius: 8,
                }}
                text="Create New Album"
                bg={colors.primary}
                onPress={() => navigation.navigate('NewAlbum')}
              />
            </Center>
          </ScrollView>
        )
      )}
    </Container>
  )
}

export default AlbumsScreen

const styles = StyleSheet.create({})
