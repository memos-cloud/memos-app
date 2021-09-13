import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { differenceInDays, format, parseISO } from 'date-fns'
import * as Constants from 'expo-constants'
import React, { useRef, useState } from 'react'
import {
  Image as PureImage,
  ImageLoadEventData,
  NativeSyntheticEvent,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native'
import Gallery, { GalleryRef } from 'react-native-awesome-gallery'
import { Image } from 'react-native-expo-image-cache'
import { useQueryClient } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { HomeNavProps } from '../@types/NavProps'
import { useStoreState } from '../@types/typedHooks'
import { AlbumIcon } from '../components/icons/AlbumIcon'
import { ArrowIcon } from '../components/icons/Arrow'
import { DeleteIcon } from '../components/icons/DeleteIcon'
import { DownloadIcon } from '../components/icons/DownloadIcon'
import { ShareIcon } from '../components/icons/ShareIcon'
import { MyText } from '../components/MyText'
import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import shorthash from 'shorthash'
import { askingForFilesPermission } from '../utils/getFilesPermision'

interface downloadAsset {
  remoteUrl: string
  localUri: string
  mimetype: string
}
const downloadAsset = async ({
  remoteUrl,
  mimetype,
  localUri,
}: downloadAsset) => {
  askingForFilesPermission()
  ToastAndroid.show('Progressing...', ToastAndroid.BOTTOM)
  const hashedUrl = shorthash.unique(remoteUrl)
  const ext = '.' + mimetype.replace('image/', '').replace('video/', '')
  const { exists } = await FileSystem.getInfoAsync(
    FileSystem.documentDirectory + hashedUrl + ext
  )
  const { exists: exists2 } = await FileSystem.getInfoAsync(localUri)

  if (exists || exists2) {
    return ToastAndroid.show('Image is already on device!', ToastAndroid.BOTTOM)
  }

  const downloadedImage = await FileSystem.downloadAsync(
    remoteUrl,
    FileSystem.documentDirectory + hashedUrl + ext
  )

  await MediaLibrary.saveToLibraryAsync(downloadedImage.uri)

  ToastAndroid.show('Saved Image!', ToastAndroid.BOTTOM)
}

const shareAsset = async ({ localUri, remoteUrl, mimetype }: downloadAsset) => {
  ToastAndroid.show('Progressing...', ToastAndroid.SHORT)
  const ext = '.' + mimetype.replace('image/', '').replace('video/', '')
  const { exists } = await FileSystem.getInfoAsync(localUri)

  let image: any
  if (!exists) {
    const hashedUrl = shorthash.unique(remoteUrl)
    const cacheUrl = FileSystem.cacheDirectory + hashedUrl + ext

    const cacheExists = await FileSystem.getInfoAsync(cacheUrl)

    if (cacheExists.exists) {
      image = cacheExists
    } else {
      const cachedImage = await FileSystem.downloadAsync(remoteUrl, cacheUrl)
      image = cachedImage
    }
  } else {
    image = { uri: localUri }
  }

  if (!(await Sharing.isAvailableAsync())) {
    alert(`Uh oh, sharing isn't available on your platform`)
    return
  }

  await Sharing.shareAsync(image.uri, {
    mimeType: mimetype,
    dialogTitle: 'Share Image',
  })
}

const options = [
  {
    id: uuidv4(),
    label: 'Share',
    icon: <ShareIcon size={22} />,
    action: shareAsset,
  },
  {
    id: uuidv4(),
    label: 'Album Cover',
    icon: <AlbumIcon size={22} />,
  },
  { id: uuidv4(), label: 'Delete', icon: <DeleteIcon size={22} /> },
  {
    id: uuidv4(),
    label: 'Download',
    icon: <DownloadIcon size={22} />,
    action: downloadAsset,
  },
]

export const AssetsPreviewScreen = ({
  navigation,
  route: { params },
}: HomeNavProps<'AssetsPreview'>) => {
  const [assetHeadersShown, setAssetHeadersShown] = useState(true)
  const queryClient = useQueryClient()
  const assets = (
    queryClient.getQueryData(`albumFiles:${params.albumId}`) as any[]
  ).filter((asset) => {
    return asset.fileURL !== 'empty' && !asset?.placeholder
  })

  const colors = useStoreState((state) => state.theme)

  const galleryRef = useRef<GalleryRef>(null)
  const [currentIndex, setCurrentIndex] = useState(params.index - 1)

  const getDate = () => {
    const diffInDays = differenceInDays(
      new Date(),
      parseISO(assets[currentIndex].createdAt)
    )
    switch (diffInDays) {
      case 0:
        return 'Today'
      case 1:
        return 'Yesterday'
      default:
        return format(parseISO(assets[currentIndex].createdAt), 'MMMM d, yyyy')
    }
  }

  return (
    <View style={styles.container}>
      {assetHeadersShown && (
        <View style={[styles.topHeader, { backgroundColor: colors.secondary }]}>
          <TouchableOpacity
            style={styles.arrowParent}
            onPress={() => navigation.goBack()}
          >
            <ArrowIcon width={21} />
          </TouchableOpacity>
          <View style={styles.date}>
            <MyText
              size='sm'
              customStyles={{
                transform: [{ translateY: 2 }],
              }}
            >
              {getDate()}
            </MyText>
            <MyText
              customStyles={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: 13,
                transform: [{ translateY: -2 }],
              }}
            >
              {format(parseISO(assets[currentIndex].createdAt), 'p')}
            </MyText>
          </View>
        </View>
      )}
      {assetHeadersShown && (
        <View
          style={[
            styles.topHeader,
            styles.bottomHeader,
            { backgroundColor: colors.secondary },
          ]}
        >
          {options.map((e) => (
            <TouchableOpacity
              onPress={() => {
                if (e.action)
                  e.action({
                    remoteUrl: assets[currentIndex].fileURL,
                    localUri: assets[currentIndex].deviceFileUrl,
                    mimetype: assets[currentIndex].mimetype,
                  })
              }}
              key={e.id}
              activeOpacity={colors.activeOpacity}
              style={styles.optionParent}
            >
              {e.icon}
              <MyText
                size='2xs'
                customStyles={{ paddingTop: 1.5, opacity: 0.8 }}
              >
                {e.label}
              </MyText>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <Gallery
        ref={galleryRef}
        onTap={() => setAssetHeadersShown(!assetHeadersShown)}
        renderItem={(imgInfo) => {
          const [loadFromDisk, setLoadFromDisk] = useState(true)

          const onLoad = ({
            nativeEvent,
          }: NativeSyntheticEvent<ImageLoadEventData>) => {
            const { width, height } = nativeEvent.source

            imgInfo.setImageDimensions({ width, height })
          }

          return (
            <View style={StyleSheet.absoluteFillObject}>
              {loadFromDisk ? (
                <PureImage
                  onLoad={onLoad}
                  resizeMode='contain'
                  style={StyleSheet.absoluteFillObject}
                  source={{ uri: imgInfo.item.fileURL }}
                  onError={() => setLoadFromDisk(false)}
                />
              ) : (
                <Image
                  onLoad={onLoad}
                  resizeMode='contain'
                  transitionDuration={0}
                  style={StyleSheet.absoluteFillObject}
                  uri={imgInfo.item.deviceFileUrl}
                />
              )}
            </View>
          )
        }}
        emptySpaceWidth={15}
        initialIndex={params.index - 1}
        data={assets}
        disableVerticalSwipe={true}
        onIndexChange={(i) => {
          setTimeout(() => galleryRef.current?.reset(), 500)
          setCurrentIndex(i)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 8,
    paddingLeft: 15,
    paddingTop: 8 + Constants.default.statusBarHeight,
  },
  bottomHeader: {
    paddingVertical: 2,
    paddingTop: 2,
    paddingHorizontal: 20,
    paddingLeft: 20,
    bottom: 0,
    top: undefined,
    justifyContent: 'space-between',
  },
  date: {
    paddingLeft: 2,
  },
  arrowParent: {
    padding: 10,
    paddingLeft: 5,
  },

  optionParent: {
    alignItems: 'center',
    padding: 10,
  },
})
