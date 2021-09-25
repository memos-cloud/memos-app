import * as FileSystem from 'expo-file-system'
import { FileSystemSessionType, FileSystemUploadType } from 'expo-file-system'
import { ToastAndroid } from 'react-native'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

export const uploadAssets = (
  albumId: string,
  filePath: string,
  objectID: string,
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
    },
    httpMethod: 'POST',
    sessionType: FileSystemSessionType.BACKGROUND,
  })
    .then(() => {
      store.getActions().fileUploaded()
    })
    .catch(() => {
      store.getActions().resetUploadProgress()
      ToastAndroid.show("Couldn't Upload Assets!", ToastAndroid.SHORT)
    })
}
