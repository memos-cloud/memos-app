import { Video } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import React, { FC, memo, useEffect, useRef, useState } from 'react'
import {
  Image as PureImage,
  ImageLoadEventData,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native'
import Gallery, {
  GalleryRef,
  RenderItemInfo,
} from 'react-native-awesome-gallery'
import { Image } from 'react-native-expo-image-cache'
import { useQueryClient } from 'react-query'

interface Props {
  params: {
    albumId: string
    index: number
  }
  setAssetHeadersShown: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  videoRef: React.MutableRefObject<null>
  setVideoStatus: any
}

export const AssetsGallery: FC<Props> = memo(
  ({
    params,
    setAssetHeadersShown,
    setCurrentIndex,
    videoRef,
    setVideoStatus,
  }) => {
    const queryClient = useQueryClient()

    const PreviewImage = memo(
      ({ imgInfo }: { imgInfo: RenderItemInfo<any> }) => {
        const [loadFromDisk, setLoadFromDisk] = useState(true)
        const [imgResult, setImgResult] = useState(false)

        const checkImage = async () => {
          const { exists } = await FileSystem.getInfoAsync(
            imgInfo.item.deviceFileUrl
          )

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
                resizeMode='contain'
                source={{ uri: imgInfo.item.deviceFileUrl }}
                onError={({ nativeEvent }) => {
                  throw new Error(nativeEvent.error)
                }}
              />
            ) : (
              <Image
                onLoad={onLoad}
                style={{ flex: 1 }}
                resizeMode='contain'
                transitionDuration={0}
                uri={imgInfo.item.fileURL}
                onError={({ nativeEvent }) => {
                  throw new Error(nativeEvent.error as any)
                }}
              />
            )}
          </View>
        )
      }
    )

    const PreviewVideo = memo(
      ({ imgInfo }: { imgInfo: RenderItemInfo<any> }) => {
        return (
          <Video
            ref={videoRef}
            style={StyleSheet.absoluteFillObject}
            source={{
              uri: imgInfo.item.deviceFileUrl,
            }}
            resizeMode='contain'
            onPlaybackStatusUpdate={(status) => {
              if ((status as any).didJustFinish) {
                return setVideoStatus(() => ({ ...status, positionMillis: 0 }))
              }
              setVideoStatus(() => status)
            }}
          />
        )
      }
    )

    const renderItem = (imgInfo: RenderItemInfo<any>) => {
      if (imgInfo.item.mimetype.includes('image/')) {
        return <PreviewImage imgInfo={imgInfo} />
      }
      return <PreviewVideo imgInfo={imgInfo} />
    }

    const assets = (
      queryClient.getQueryData(`albumFiles:${params.albumId}`) as any[]
    ).filter((asset) => {
      return asset.fileURL !== 'empty' && !asset?.placeholder
    })

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
        renderItem={renderItem}
        emptySpaceWidth={15}
        initialIndex={params.index - 1}
        data={assets}
        disableVerticalSwipe={true}
        onIndexChange={(i) => {
          setTimeout(() => galleryRef.current?.reset(), 500)
          setCurrentIndex(i)
        }}
      />
    )
  }
)
