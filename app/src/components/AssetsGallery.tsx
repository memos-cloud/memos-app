import { Video } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import React, { FC, memo, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Image as PureImage,
  ImageLoadEventData,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import Gallery, {
  GalleryRef,
  RenderItemInfo,
} from 'react-native-awesome-gallery'
import { Image } from 'react-native-expo-image-cache'
import { useQuery, useQueryClient } from 'react-query'
import { useStoreActions, useStoreState } from '../@types/typedHooks'
import { getAlbumFiles } from '../api/getAlbumFiles'
import { store } from '../state-management/stores'
import { Center } from './Center'

const PreviewImage = memo(({ imgInfo }: { imgInfo: RenderItemInfo<any> }) => {
  const [loadFromDisk, setLoadFromDisk] = useState(true)
  const [imgResult, setImgResult] = useState(false)

  const checkImage = async () => {
    const { exists } = await FileSystem.getInfoAsync(imgInfo.item.deviceFileUrl)

    setLoadFromDisk(exists)

    setImgResult(true)
  }

  useEffect(() => {
    checkImage()
  }, [])

  const onLoad = ({
    nativeEvent,
  }: NativeSyntheticEvent<ImageLoadEventData>) => {
    const { width, height } = nativeEvent.source

    imgInfo.setImageDimensions({ height, width })
  }

  if (!imgResult) {
    return <View style={StyleSheet.absoluteFillObject} />
  }

  return (
    <View style={[StyleSheet.absoluteFillObject]}>
      {loadFromDisk ? (
        <PureImage
          onLoad={onLoad}
          style={{ flex: 1 }}
          resizeMode="contain"
          source={{ uri: imgInfo.item.deviceFileUrl }}
        />
      ) : (
        <Image
          onLoad={onLoad}
          style={{ flex: 1 }}
          resizeMode="contain"
          transitionDuration={0}
          uri={imgInfo.item.fileURL}
        />
      )}
    </View>
  )
})

const VideoIsLoading = ({ style }: { style: StyleProp<ViewStyle> }) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <View style={[style, { flex: 1 }]}>
      <Center>
        <ActivityIndicator size="large" color={colors.primary} />
      </Center>
    </View>
  )
}

const PreviewVideo = memo(
  ({
    videoInfo,
    setVideoIsLoading,
    videoRef,
    setVideoStatus,
  }: {
    videoInfo: RenderItemInfo<any>
    setVideoStatus: any
    videoRef: any
    setVideoIsLoading: any
  }) => {
    const [loadFromDisk, setLoadFromDisk] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [videoResult, setVideoResult] = useState(false)

    const checkVideo = async () => {
      const { exists } = await FileSystem.getInfoAsync(
        videoInfo.item.deviceFileUrl,
      )

      setLoadFromDisk(exists)

      setVideoResult(true)
    }

    useEffect(() => {
      checkVideo()
    }, [])

    if (!videoResult) {
      return <View style={StyleSheet.absoluteFillObject} />
    }

    return (
      <>
        {isLoading && <VideoIsLoading style={{}} />}
        <Video
          shouldPlay={true}
          onLoadStart={() => {
            setVideoIsLoading(true)
            setIsLoading(true)
          }}
          onLayout={(e) => {
            videoInfo.setImageDimensions({ ...e.nativeEvent.layout })
          }}
          onLoad={(e) => {
            setVideoIsLoading(false)
            setIsLoading(false)
          }}
          ref={videoRef}
          style={StyleSheet.absoluteFillObject}
          source={{
            uri: loadFromDisk
              ? videoInfo.item.deviceFileUrl
              : videoInfo.item.fileURL,
          }}
          resizeMode="contain"
          onPlaybackStatusUpdate={(status) => {
            if ((status as any).isPlaying) {
              setVideoStatus(status)
            }
            if ((status as any).didJustFinish) {
              ;(videoRef.current as any)?.setPositionAsync(0)
              ;(videoRef.current as any)?.pauseAsync()
              return setVideoStatus({ ...status, positionMillis: 0 })
            }
          }}
        />
      </>
    )
  },
)

const RenderItem = memo(
  ({
    info,
    index,
    setVideoIsLoading,
    videoRef,
    setVideoStatus,
  }: {
    info: any
    index: number
    setVideoIsLoading: any
    videoRef: any
    setVideoStatus: any
  }) => {
    if (info.item.mimetype.includes('image/')) {
      return <PreviewImage imgInfo={info} />
    }

    if (info.index !== index) {
      return <VideoIsLoading style={{}} />
    }
    return (
      <PreviewVideo
        videoInfo={info}
        setVideoIsLoading={setVideoIsLoading}
        setVideoStatus={setVideoStatus}
        videoRef={videoRef}
      />
    )
  },
)

interface Props {
  params: {
    albumId: string
    index: number
  }
  setAssetHeadersShown: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  videoRef: React.MutableRefObject<null>
  setVideoStatus: any
  setVideoIsLoading: any
}

export const AssetsGallery: FC<Props> = memo(
  ({
    params,
    setAssetHeadersShown,
    setCurrentIndex,
    videoRef,
    setVideoStatus,
    setVideoIsLoading,
  }) => {
    const setAssetIndex = useStoreActions((actions) => actions.setAssetIndex)
    const [index, setIndex] = useState(params.index)

    const { data: assets } = useQuery(
      `albumFiles:${params.albumId}`,
      () => getAlbumFiles(params.albumId),
      { staleTime: Infinity },
    )

    const galleryRef = useRef<GalleryRef>(null)

    const toggleHeader = () => {
      setAssetHeadersShown((assetHeadersShown) => {
        return !assetHeadersShown
      })
    }

    return (
      <Gallery
        doubleTapInterval={350}
        ref={galleryRef}
        onTap={toggleHeader}
        renderItem={(item) => (
          <RenderItem
            info={item}
            index={index}
            setVideoIsLoading={setVideoIsLoading}
            setVideoStatus={setVideoStatus}
            videoRef={videoRef}
          />
        )}
        emptySpaceWidth={15}
        initialIndex={params.index}
        data={assets.filter((asset: any) => {
          return asset.fileURL !== 'empty' && !asset?.placeholder
        })}
        disableVerticalSwipe={true}
        onIndexChange={(i) => {
          setTimeout(() => galleryRef.current?.reset(), 500)
          setCurrentIndex(i)

          if (
            assets[i + 1]?.mimetype?.includes('video/') ||
            assets[i]?.mimetype?.includes('video/')
          ) {
            setTimeout(() => {
              setIndex(i)
            }, 500)
          }

          setTimeout(() => {
            setAssetIndex(i + 1)
          }, 300)
        }}
      />
    )
  },
)
