import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { useQueryClient } from 'react-query'
import { HomeNavProps } from '../@types/NavProps'
import { useStoreState } from '../@types/typedHooks'
import Container from '../components/Container'
import { SmoothFastImage } from '../components/SmoothFastImage'
import { Video, AVPlaybackStatus } from 'expo-av'
import { Center } from '../components/Center'

export const AssetsPreviewScreen = ({
  route: { params },
}: HomeNavProps<'AssetsPreview'>) => {
  const queryClient = useQueryClient()
  const assets = (
    queryClient.getQueryData(`albumFiles:${params.albumId}`) as any[]
  ).filter((asset) => {
    return asset.fileURL !== 'empty' && !asset?.placeholder
  })
  const colors = useStoreState((state) => state.theme)

  const RenderItem = ({ item }: any) => {
    if (item.mimetype.includes('image')) {
      return (
        <SmoothFastImage
          transitionDuration={0}
          style={styles.image}
          source={{ uri: item.fileURL }}
          resizeMode='contain'
        />
      )
    } else {
      return (
        <Container
          customStyles={[
            {
              padding: 0,
              justifyContent: 'center',
            },
          ]}
        >
          <Video
            useNativeControls
            resizeMode='contain'
            style={[styles.video]}
            source={{ uri: item.fileURL }}
          />
        </Container>
      )
    }
  }
  return (
    <>
      <Swiper
        style={[styles.wrapper, { backgroundColor: colors.black }]}
        showsButtons={false}
        showsPagination={false}
        loop={false}
        onIndexChanged={(index) => {
          console.log(index)
        }}
        index={params.index - 1}
      >
        {assets.map((asset) => (
          <RenderItem key={asset.id} item={asset} />
        ))}
      </Swiper>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  image: {
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
})
