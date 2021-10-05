import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import { FileSystemSessionType, FileSystemUploadType } from 'expo-file-system'
import { ToastAndroid } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

export const uploadAssets = async (
  albumId: string,
  filePath: string,
  objectID: string,
  duration: number,
  fileId: string,
) => {
  const { accessToken } = store.getState()
  const uploadTo = `${serverURL}/albums/${albumId}/upload`

  return FileSystem.uploadAsync(uploadTo, filePath, {
    uploadType: FileSystemUploadType.MULTIPART,
    fieldName: 'Files',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      devicefileurl: filePath,
      fileId: objectID,
      duration: duration > 0 ? duration.toString() : undefined,
    },
    httpMethod: 'POST',
    sessionType: FileSystemSessionType.BACKGROUND,
  })
    .catch(() => {
      store.getActions().resetUploadProgress()
      ToastAndroid.show("Couldn't Upload Assets!", ToastAndroid.SHORT)
    })
    .then(async (data) => {
      if ([201, 200].includes(data?.status)) {
        // const stored = await AsyncStorage.getItem('deleteAssetsAfterUpload')
        // const deleteAsset = stored ? JSON.parse(stored).state : false

        store.getActions().fileUploaded()

        // if (deleteAsset) {
        //   await MediaLibrary.deleteAssetsAsync([fileId])
        // }
      } else {
        store.getActions().resetUploadProgress()
        if (data?.status === 429) {
          showMessage({
            message: "You've Reached Your Quota Limit!",
            description: 'Go to your Profile Screen, check Usage.',
            type: 'danger',
          })
        } else {
          showMessage({
            message: "Couldn't Upload Assets!",
            type: 'danger',
          })
        }
      }
    })
}
