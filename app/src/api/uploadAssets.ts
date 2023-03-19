import * as FileSystem from 'expo-file-system'
import { FileSystemSessionType, FileSystemUploadType } from 'expo-file-system'
import { ToastAndroid } from 'react-native'
import base64 from 'react-native-base64'
import { showMessage } from 'react-native-flash-message'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management'

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
      devicefileurl: base64.encode(filePath),
      fileId: objectID,
      duration: duration > 0 ? duration.toString() : undefined,
    },
    httpMethod: 'POST',
    sessionType: FileSystemSessionType.BACKGROUND,
  })
    .catch(() => {
      store.getActions().resetUploadProgress()
      store.getActions().resetUploadProgressFiles()

      ToastAndroid.show("Couldn't Upload Assets!", ToastAndroid.SHORT)
    })
    .then(async (data) => {
      if ([201, 200].includes(data?.status)) {
        store.getActions().fileUploaded()
        store.getActions().updateUploadProgressFiles({ albumId, id: fileId })
      } else {
        store.getActions().resetUploadProgress()
        store.getActions().resetUploadProgressFiles()
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
